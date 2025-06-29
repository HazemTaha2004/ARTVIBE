      const content = document.getElementById("content");
      const spotlight = document.getElementById("spotlight");
      const loading = document.getElementById("loading");
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      const closeLightbox = document.getElementById("close-lightbox");
      const prevSlide = document.getElementById("prev-slide");
      const nextSlide = document.getElementById("next-slide");
      const allPostsBtn = document.getElementById("all-posts");
      const favoritesBtn = document.getElementById("favorites");
      const themeToggle = document.getElementById("theme-toggle");
      let page = 1;
      let isLoading = false;
      let viewMode = "all";
      let allItems = [];
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let lightboxIndex = -1;

      // Mock data
      function generateMockData() {
        const base = `https://picsum.photos/600/${400 + page * 10}`;
        return Array.from({ length: 6 }, (_, i) => ({
          id: page * 10 + i,
          title: `Artwork ${page * 10 + i + 1}`,
          description: "A stunning piece of creative brilliance.",
          writer: `Artist ${i + 1}`,
          image: `${base}?random=${i}`,
          largeImage: `${base.replace("600", "1200")}/${
            800 + page * 10
          }?random=${i}`,
        }));
      }

      // Render card
      function renderCard(item, isSpotlight = false) {
        const card = document.createElement("div");
        card.className = isSpotlight
          ? "spotlight-load"
          : `card-load ${
              viewMode === "all"
                ? "lg:col-span-4 lg:row-span-2"
                : "lg:col-span-3 lg:row-span-1"
            } ${page % 3 === 0 ? "lg:col-span-3 lg:row-span-3" : ""}`;
        card.innerHTML = `
                <div class="relative group overflow-hidden rounded-lg">
                    <img src="${item.image}" alt="${
          item.title
        }" class="w-full ${
          isSpotlight ? "h-[400px] sm:h-[500px]" : "h-64 sm:h-80"
        } object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
                    <div class="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
                        <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-wide ${
                          isSpotlight ? "text-3xl sm:text-4xl" : ""
                        }">${item.title}</h2>
                        <p class="text-sm sm:text-base">${item.description}</p>
                        <p class="text-xs sm:text-sm italic">by ${
                          item.writer
                        }</p>
                        <div class="flex justify-between mt-2">
                            <button class="love-btn text-2xl ${
                              favorites.some((fav) => fav.id === item.id)
                                ? "loved text-red-600"
                                : "text-white"
                            } relative" data-id="${item.id}">${
          favorites.some((fav) => fav.id === item.id) ? "❤️" : "♡"
        }</button>
                            <button class="download-btn bg-white text-black px-3 py-1 rounded text-sm uppercase hover:bg-red-600 hover:text-white transition" data-url="${
                              item.image
                            }">Download</button>
                        </div>
                    </div>
                </div>
            `;
        const target = isSpotlight ? spotlight : content;
        target.appendChild(card);

        const loveBtn = card.querySelector(".love-btn");
        loveBtn.addEventListener("click", () => toggleFavorite(item, loveBtn));

        const downloadBtn = card.querySelector(".download-btn");
        downloadBtn.addEventListener("click", () =>
          downloadImage(item.image, `${item.title}.jpg`)
        );

        const img = card.querySelector("img");
        img.addEventListener("click", () =>
          openLightbox(
            item,
            allItems.concat(favorites).findIndex((i) => i.id === item.id)
          )
        );
        // Lightbox
        card.querySelector("img").addEventListener("click", () => {
          lightboxImg.src = item.image;
          lightbox.classList.add("active");
        });
      }

      // Toggle favorite
      function toggleFavorite(item, loveBtn) {
        const index = favorites.findIndex((fav) => fav.id === item.id);
        if (index === -1) {
          favorites.push(item);
          loveBtn.innerHTML = "❤️";
          loveBtn.classList.add("loved", "text-red-600");
          loveBtn.classList.remove("text-white");
        } else {
          favorites.splice(index, 1);
          loveBtn.innerHTML = "♡";
          loveBtn.classList.remove("loved", "text-red-600");
          loveBtn.classList.add("text-white");
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        if (viewMode === "favorites") renderContent();
        updateSpotlight();
      }

      // Update spotlight
      function updateSpotlight() {
        spotlight.innerHTML = "";
        const source = favorites.length > 0 ? favorites : allItems.slice(-6);
        if (source.length === 0) return;
        const featured = source[Math.floor(Math.random() * source.length)];
        renderCard(featured, true);
      }

      // Render content
      function renderContent() {
        content.innerHTML = "";
        const itemsToRender = viewMode === "all" ? allItems : favorites;
        itemsToRender.forEach((item) => renderCard(item));
        updateSpotlight();
      }

      // Load content
      function loadContent() {
        if (isLoading) return;
        isLoading = true;
        loading.classList.add("active");
        setTimeout(() => {
          const newItems = generateMockData();
          allItems = [...allItems, ...newItems];
          if (viewMode === "all") newItems.forEach((item) => renderCard(item));
          page++;
          isLoading = false;
          loading.classList.remove("active");
          updateSpotlight();
        }, 1000);
      }

      // Download image
      async function downloadImage(url, filename) {
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Lightbox functionality
      function openLightbox(item, index) {
        lightboxIndex = index;
        lightboxImg.src = item.largeImage;
        lightbox.classList.remove("hidden");
        updateLightboxButtons();
      }
      // Lightbox close
      closeLightbox.addEventListener("click", () =>
        lightbox.classList.remove("active")
      );
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.remove("active");
      });

      function updateLightboxButtons() {
        const items = viewMode === "all" ? allItems : favorites;
        prevSlide.classList.toggle("hidden", lightboxIndex <= 0);
        nextSlide.classList.toggle("hidden", lightboxIndex >= items.length - 1);
      }

      prevSlide.addEventListener("click", () => {
        if (lightboxIndex > 0) {
          lightboxIndex--;
          lightboxImg.src = (viewMode === "all" ? allItems : favorites)[
            lightboxIndex
          ].largeImage;
          updateLightboxButtons();
        }
      });

      nextSlide.addEventListener("click", () => {
        if (
          lightboxIndex <
          (viewMode === "all" ? allItems : favorites).length - 1
        ) {
          lightboxIndex++;
          lightboxImg.src = (viewMode === "all" ? allItems : favorites)[
            lightboxIndex
          ].largeImage;
          updateLightboxButtons();
        }
      });

      closeLightbox.addEventListener("click", () =>
        lightbox.classList.add("hidden")
      );
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.add("hidden");
      });

      // Infinite scroll
      window.addEventListener("scroll", () => {
        if (
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 300 &&
          viewMode === "all"
        ) {
          loadContent();
        }
      });

      // Toggle view mode
      allPostsBtn.addEventListener("click", () => {
        viewMode = "all";
        allPostsBtn.classList.add("active");
        favoritesBtn.classList.remove("active");
        renderContent();
      });

      favoritesBtn.addEventListener("click", () => {
        viewMode = "favorites";
        favoritesBtn.classList.add("active");
        allPostsBtn.classList.remove("active");
        renderContent();
      });

      // Theme toggle
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");
        themeToggle.textContent = document.body.classList.contains("light")
          ? "Dark Mode"
          : "Light Mode";
      });

      favoritesBtn.addEventListener("click", () => {
        viewMode = "favorites";
        favoritesBtn.classList.add("active");
        allPostsBtn.classList.remove("active");
        renderContent();
      });

      // Theme toggle
      themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        document.querySelector(".sun").classList.toggle("hidden", !isDark);
        document.querySelector(".moon").classList.toggle("hidden", isDark);
        document.body.classList.toggle("bg-gray-900", isDark);
        document.body.classList.toggle("bg-white", !isDark);
        document.body.classList.toggle("text-white", isDark);
        document.body.classList.toggle("text-gray-900", !isDark);
        document
          .querySelector("header")
          .classList.toggle("bg-gray-900/80", isDark);
        document
          .querySelector("header")
          .classList.toggle("bg-white/80", !isDark);
      });

      // Initial load
      loadContent();
