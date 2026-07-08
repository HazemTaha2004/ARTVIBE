/**
 * ArtVibe — Immersive Creative Dashboard & Gallery
 * Core Application Script
 * 
 * Handles interactive feed loading, favorites state (via localStorage), 
 * theme toggling, custom lightbox slide controls, and image downloads.
 */

(function () {
  'use strict';

  // ==========================================
  // CONFIGURATION CONSTANTS
  // ==========================================
  const CONFIG = {
    BASE_WIDTH: 600,
    LARGE_WIDTH: 1200,
    SCROLL_TRIGGER_OFFSET: 400,
    NOTIFICATION_TIMEOUT: 2500,
    MOCK_ITEMS_PER_PAGE: 6,
    NETWORK_DELAY: 800
  };

  // ==========================================
  // DOM ELEMENT SELECTIONS
  // ==========================================
  const DOM = {
    content: document.getElementById("content"),
    spotlight: document.getElementById("spotlight"),
    loading: document.getElementById("loading"),
    lightbox: document.getElementById("lightbox"),
    lightboxImg: document.getElementById("lightbox-img"),
    lightboxTitle: document.getElementById("lightbox-title"),
    lightboxDesc: document.getElementById("lightbox-desc"),
    closeLightbox: document.getElementById("close-lightbox"),
    prevSlide: document.getElementById("prev-slide"),
    nextSlide: document.getElementById("next-slide"),
    allPostsBtn: document.getElementById("all-posts"),
    favoritesBtn: document.getElementById("favorites"),
    themeToggle: document.getElementById("theme-toggle"),
    notification: document.getElementById("notification")
  };

  // ==========================================
  // APPLICATION STATE
  // ==========================================
  const state = {
    page: 1,
    isLoading: false,
    viewMode: "all",
    allItems: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    lightboxIndex: -1
  };

  // ==========================================
  // UTILITY & BUSINESS LOGIC FUNCTIONS
  // ==========================================

  /**
   * Generates mock artwork data based on current page and index.
   * Uses picsum.photos for random image placeholders.
   * @returns {Array<Object>} List of artwork objects
   */
  function generateMockData() {
    const baseHeight = 400 + state.page * 10;
    return Array.from({ length: CONFIG.MOCK_ITEMS_PER_PAGE }, (_, i) => {
      const id = state.page * 10 + i;
      const imgUrl = `https://picsum.photos/${CONFIG.BASE_WIDTH}/${baseHeight}?random=${id}`;
      const largeImgUrl = `https://picsum.photos/${CONFIG.LARGE_WIDTH}/${800 + state.page * 10}?random=${id}`;
      return {
        id: id,
        title: `Artwork ${id + 1}`,
        description: "A stunning piece of creative brilliance showing artistic mastery.",
        writer: `Artist ${i + 1}`,
        image: imgUrl,
        largeImage: largeImgUrl
      };
    });
  }

  /**
   * Shows a toast notification message on screen.
   * @param {string} message - Toast message text
   */
  function showNotification(message) {
    if (!DOM.notification) return;
    DOM.notification.textContent = message;
    DOM.notification.classList.add("show");
    setTimeout(() => {
      DOM.notification.classList.remove("show");
    }, CONFIG.NOTIFICATION_TIMEOUT);
  }

  /**
   * Renders a single artwork card element.
   * @param {Object} item - The artwork data object
   * @param {boolean} isSpotlight - True if rendering inside the spotlight banner
   */
  function renderCard(item, isSpotlight = false) {
    const card = document.createElement("div");
    
    if (isSpotlight) {
      card.className = "spotlight-load w-full";
    } else {
      // Dynamic Grid Spanning for a masonry style visual rhythm
      const spanClass = state.viewMode === "all"
        ? "lg:col-span-4 lg:row-span-2"
        : "lg:col-span-3 lg:row-span-1";
      const specialSpan = (!isSpotlight && state.page % 3 === 0) ? "lg:col-span-3 lg:row-span-3" : "";
      card.className = `card-load ${spanClass} ${specialSpan} w-full`;
    }

    const isLoved = state.favorites.some((fav) => fav.id === item.id);

    card.innerHTML = `
      <div class="relative group overflow-hidden rounded-xl border border-gray-800 shadow-md bg-gray-950/40">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="w-full ${isSpotlight ? "h-[350px] sm:h-[480px]" : "h-64 sm:h-80"} object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer" 
          loading="lazy"
        >
        <div class="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent w-full">
          <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-wider ${isSpotlight ? "text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400" : "text-white"}">${item.title}</h2>
          <p class="text-sm text-gray-300 mt-1">${item.description}</p>
          <p class="text-xs text-gray-400 italic mt-1">by ${item.writer}</p>
          <div class="flex justify-between items-center mt-4">
            <button 
              class="love-btn text-2xl hover:scale-110 transition-transform focus:outline-none ${isLoved ? "loved text-red-500" : "text-gray-400"}" 
              data-id="${item.id}"
              aria-label="Favorite this artwork"
            >
              ${isLoved ? "❤️" : "♡"}
            </button>
            <button 
              class="download-btn bg-white/10 hover:bg-red-600 text-white hover:text-white px-4 py-1.5 rounded-lg text-xs uppercase font-semibold tracking-wider transition-all"
              data-url="${item.image}"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    `;

    const target = isSpotlight ? DOM.spotlight : DOM.content;
    if (target) target.appendChild(card);

    // Love Button Click Handler
    const loveBtn = card.querySelector(".love-btn");
    if (loveBtn) {
      loveBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(item, loveBtn);
      });
    }

    // Download Button Click Handler
    const downloadBtn = card.querySelector(".download-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        downloadImage(item.image, `${item.title.toLowerCase().replace(/\s+/g, "_")}.jpg`);
      });
    }

    // Open Lightbox Handler
    const img = card.querySelector("img");
    if (img) {
      img.addEventListener("click", () => {
        const currentList = state.viewMode === "all" ? state.allItems : state.favorites;
        const index = currentList.findIndex((i) => i.id === item.id);
        openLightbox(item, index);
      });
    }
  }

  /**
   * Toggles favorited state of an artwork.
   * @param {Object} item - Artwork item to toggle
   * @param {HTMLElement} loveBtn - Love button element node
   */
  function toggleFavorite(item, loveBtn) {
    const index = state.favorites.findIndex((fav) => fav.id === item.id);
    
    if (index === -1) {
      state.favorites.push(item);
      loveBtn.innerHTML = "❤️";
      loveBtn.classList.add("loved", "text-red-500");
      loveBtn.classList.remove("text-gray-400");
      showNotification(`Added "${item.title}" to Favorites!`);
    } else {
      state.favorites.splice(index, 1);
      loveBtn.innerHTML = "♡";
      loveBtn.classList.remove("loved", "text-red-500");
      loveBtn.classList.add("text-gray-400");
      showNotification(`Removed "${item.title}" from Favorites.`);
    }

    localStorage.setItem("favorites", JSON.stringify(state.favorites));

    if (state.viewMode === "favorites") {
      renderContent();
    } else {
      updateSpotlight();
    }
  }

  /**
   * Updates the Spotlight Hero component.
   * Displays a random artwork from favorites or the latest items.
   */
  function updateSpotlight() {
    if (!DOM.spotlight) return;
    DOM.spotlight.innerHTML = "";
    
    const source = state.favorites.length > 0 ? state.favorites : state.allItems.slice(-6);
    if (source.length === 0) return;
    
    const featured = source[Math.floor(Math.random() * source.length)];
    renderCard(featured, true);
  }

  /**
   * Clears and renders active page content according to current viewMode.
   */
  function renderContent() {
    if (!DOM.content) return;
    DOM.content.innerHTML = "";
    
    const itemsToRender = state.viewMode === "all" ? state.allItems : state.favorites;
    itemsToRender.forEach((item) => renderCard(item));
    updateSpotlight();
  }

  /**
   * Standard content loading sequence.
   * Simulates network fetch before rendering mock data.
   */
  function loadContent() {
    if (state.isLoading) return;
    state.isLoading = true;
    
    if (DOM.loading) DOM.loading.classList.add("opacity-100");
    
    setTimeout(() => {
      const newItems = generateMockData();
      state.allItems = [...state.allItems, ...newItems];
      
      if (state.viewMode === "all") {
        newItems.forEach((item) => renderCard(item));
      }
      
      state.page++;
      state.isLoading = false;
      
      if (DOM.loading) DOM.loading.classList.remove("opacity-100");
      updateSpotlight();
    }, CONFIG.NETWORK_DELAY);
  }

  /**
   * Downloads artwork image to disk.
   * Falls back to opening image tab on CORS network blocks.
   * @param {string} url - Target image URL
   * @param {string} filename - Filename to save as
   */
  async function downloadImage(url, filename) {
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error("HTTP status check failed");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      showNotification("Image download started successfully.");
    } catch (error) {
      console.warn("Direct download failed due to CORS restrictions, redirecting to raw image URL.", error);
      window.open(url, "_blank");
    }
  }

  /**
   * Opens Lightbox slide modal.
   * @param {Object} item - Selected artwork object
   * @param {number} index - Index of selected item in active views
   */
  function openLightbox(item, index) {
    if (!DOM.lightbox) return;
    state.lightboxIndex = index;
    
    if (DOM.lightboxImg) DOM.lightboxImg.src = item.largeImage;
    if (DOM.lightboxTitle) DOM.lightboxTitle.textContent = item.title;
    if (DOM.lightboxDesc) DOM.lightboxDesc.textContent = `${item.description} (by ${item.writer})`;
    
    DOM.lightbox.classList.remove("hidden");
    // Trigger transition reflow
    setTimeout(() => {
      DOM.lightbox.classList.add("active");
    }, 10);
    
    updateLightboxButtons();
  }

  /**
   * Closes Lightbox slide modal.
   */
  function closeLightboxModal() {
    if (!DOM.lightbox) return;
    DOM.lightbox.classList.remove("active");
    setTimeout(() => {
      DOM.lightbox.classList.add("hidden");
      if (DOM.lightboxImg) DOM.lightboxImg.src = "";
    }, 300);
  }

  /**
   * Toggles previous/next arrow button visibilities based on slide bounds.
   */
  function updateLightboxButtons() {
    const currentList = state.viewMode === "all" ? state.allItems : state.favorites;
    if (DOM.prevSlide) DOM.prevSlide.classList.toggle("hidden", state.lightboxIndex <= 0);
    if (DOM.nextSlide) DOM.nextSlide.classList.toggle("hidden", state.lightboxIndex >= currentList.length - 1);
  }

  // ==========================================
  // EVENT LISTENERS SETUP
  // ==========================================

  // Lightbox Close Click Handlers
  if (DOM.closeLightbox) {
    DOM.closeLightbox.addEventListener("click", closeLightboxModal);
  }
  if (DOM.lightbox) {
    DOM.lightbox.addEventListener("click", (e) => {
      if (e.target === DOM.lightbox || e.target.id === "lightbox") {
        closeLightboxModal();
      }
    });
  }

  // Slide Navigation Handlers
  if (DOM.prevSlide) {
    DOM.prevSlide.addEventListener("click", () => {
      if (state.lightboxIndex > 0) {
        state.lightboxIndex--;
        const currentList = state.viewMode === "all" ? state.allItems : state.favorites;
        const prevItem = currentList[state.lightboxIndex];
        if (DOM.lightboxImg) DOM.lightboxImg.src = prevItem.largeImage;
        if (DOM.lightboxTitle) DOM.lightboxTitle.textContent = prevItem.title;
        if (DOM.lightboxDesc) DOM.lightboxDesc.textContent = `${prevItem.description} (by ${prevItem.writer})`;
        updateLightboxButtons();
      }
    });
  }

  if (DOM.nextSlide) {
    DOM.nextSlide.addEventListener("click", () => {
      const currentList = state.viewMode === "all" ? state.allItems : state.favorites;
      if (state.lightboxIndex < currentList.length - 1) {
        state.lightboxIndex++;
        const nextItem = currentList[state.lightboxIndex];
        if (DOM.lightboxImg) DOM.lightboxImg.src = nextItem.largeImage;
        if (DOM.lightboxTitle) DOM.lightboxTitle.textContent = nextItem.title;
        if (DOM.lightboxDesc) DOM.lightboxDesc.textContent = `${nextItem.description} (by ${nextItem.writer})`;
        updateLightboxButtons();
      }
    });
  }

  // Keyboard Accessibility Controls (Esc, Left, Right Arrow)
  window.addEventListener("keydown", (e) => {
    if (DOM.lightbox && !DOM.lightbox.classList.contains("hidden")) {
      if (e.key === "Escape") {
        closeLightboxModal();
      } else if (e.key === "ArrowLeft" && DOM.prevSlide && !DOM.prevSlide.classList.contains("hidden")) {
        DOM.prevSlide.click();
      } else if (e.key === "ArrowRight" && DOM.nextSlide && !DOM.nextSlide.classList.contains("hidden")) {
        DOM.nextSlide.click();
      }
    }
  });

  // View Toggle: All Posts
  if (DOM.allPostsBtn) {
    DOM.allPostsBtn.addEventListener("click", () => {
      if (state.viewMode === "all") return;
      state.viewMode = "all";
      DOM.allPostsBtn.classList.add("active-btn");
      if (DOM.favoritesBtn) DOM.favoritesBtn.classList.remove("active-btn");
      renderContent();
    });
  }

  // View Toggle: Favorites
  if (DOM.favoritesBtn) {
    DOM.favoritesBtn.addEventListener("click", () => {
      if (state.viewMode === "favorites") return;
      state.viewMode = "favorites";
      DOM.favoritesBtn.classList.add("active-btn");
      if (DOM.allPostsBtn) DOM.allPostsBtn.classList.remove("active-btn");
      renderContent();
    });
  }

  // Consolidated Theme Toggle (Dark & Light Mode Integration)
  if (DOM.themeToggle) {
    DOM.themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      
      // Sync UI icons
      const sunIcon = document.querySelector(".sun");
      const moonIcon = document.querySelector(".moon");
      if (sunIcon) sunIcon.classList.toggle("hidden", !isDark);
      if (moonIcon) moonIcon.classList.toggle("hidden", isDark);
      
      // Manage class styling hooks on body element
      document.body.classList.toggle("light", !isDark);
      document.body.classList.toggle("bg-gray-900", isDark);
      document.body.classList.toggle("bg-white", !isDark);
      document.body.classList.toggle("text-white", isDark);
      document.body.classList.toggle("text-gray-900", !isDark);
      
      // Manage header border-colors and backgrounds
      const header = document.querySelector("header");
      if (header) {
        header.classList.toggle("bg-gray-900/80", isDark);
        header.classList.toggle("bg-white/80", !isDark);
        header.classList.toggle("border-gray-800", isDark);
        header.classList.toggle("border-gray-200", !isDark);
      }
      
      showNotification(`Switched to ${isDark ? "Dark" : "Light"} theme.`);
    });
  }

  // Infinite Scroll Event Listener
  window.addEventListener("scroll", () => {
    if (state.viewMode !== "all") return;
    const triggerHeight = document.body.offsetHeight - CONFIG.SCROLL_TRIGGER_OFFSET;
    const scrollPosition = window.innerHeight + window.scrollY;
    if (scrollPosition >= triggerHeight) {
      loadContent();
    }
  });

  // ==========================================
  // INITIALIZATION BOOTSTRAP
  // ==========================================
  loadContent();

})();
