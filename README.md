# ArtVibe — Immersive Creative Dashboard & Gallery

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

ArtVibe is a responsive, highly polished image-browsing dashboard and artwork gallery. Engineered for premium visual aesthetics, it features fluid transitions, dynamic image loading, persistent favorites caching, micro-interactions, and full accessibility support (including keyboard navigation).

---

## 🚀 Live Demo

✨ **Explore ArtVibe online:** [Live Demo Link Placeholder](https://hazemtaha2004.github.io/ARTVIBE) *(Replace with actual hosting URL e.g., GitHub Pages)*

---

## 📸 Screenshots & Previews

*Note: Visual representations of the platform under various viewports.*

### 🖥️ Desktop Dashboard (Dark Mode)
*(Placeholder: Capture dashboard highlighting the Spotlight Hero Banner and Masonry grid)*

### 📱 Responsive Layouts (Tablet & Mobile)
*(Placeholder: Capture mobile menu and collapsed layout scaling)*

### 🖼️ Interactive Lightbox & Gallery Mode
*(Placeholder: Capture open Lightbox showcasing high-res image and description overlays)*

### 💡 Recommended Captures for Portfolio Presentation:
1. **Desktop Landing** — Main interface showing spotlight banner and initial gallery feed in Dark Theme.
2. **Light Theme View** — Main dashboard after toggling theme to light mode.
3. **Favorites Mode** — Dashboard showing only custom curated items.
4. **Active Lightbox** — Selected card opened in fullscreen preview with active next/prev buttons.
5. **Mobile Viewport** — Clean 1-column responsive layout on simulated iPhone/Android.

---

## ✨ Features

- 🎭 **Masonry Layout Rhythm**: Custom dynamic column spans based on items and loading sequences, delivering a modern portfolio aesthetics experience.
- 💫 **Spotlight Banner Hero**: Automatically rotates a featured artwork from the user's favorites, or falls back to the latest gallery uploads if no favorites are chosen.
- ⚡ **Infinite Scroll Loading**: Seamless automated feed extension as the user scrolls, simulating paginated API fetches.
- ❤️ **Curated Favorites System**: Add or remove artworks from favorites. Choices are cached on the client side using `localStorage` for complete persistence.
- 🔍 **Interactive Lightbox Carousel**: Fullscreen image inspection modal with smooth transitions, responsive sizing, text descriptors, slide controls, and keyboard accessibility (Esc to close, Arrow keys to navigate).
- 🌓 **Dynamic Theme Toggling**: Instant toggle between high-contrast dark theme and clean light theme with stateful header transparency adjustments.
- 📥 **Local Image Downloading**: Action buttons initiating direct file downloads. Automatically falls back to open raw images in new tabs under CORS security policies.
- 🔔 **Toast Notification System**: Graceful visual confirmations for user interactions like favoriting and theme shifts.

---

## 🛠️ Tech Stack

- **Core & Markup**: HTML5 (Semantic and ARIA accessible markup)
- **Logics & Interactions**: Vanilla JavaScript (ES6+, asynchronous fetch API, storage caching, event orchestration)
- **Styling**: Tailwind CSS (Utility classes for responsive layouts) & Vanilla CSS3 (Custom transitions, keyframe animations, variables system)
- **Images**: Lorem Picsum API (Dynamic image placeholders)

---

## 📥 Installation & Setup

ArtVibe is client-only and runs directly in the browser without complex server setups.

### Quick Start
1. **Clone the repository:**
   ```bash
   git clone https://github.com/HazemTaha2004/ARTVIBE.git
   cd ARTVIBE
   ```

2. **Run locally:**
   - Simply double-click [index.html](file:///e:/Privet/New%20folder/coding/protofoilo/githup%20improve/ARTVIBE/index.html) to run it directly in your browser.
   - *Or*, serve it with a local development server (e.g., Live Server in VS Code, or python):
     ```bash
     python -m http.server 8000
     ```
     Then open `http://localhost:8000` in your web browser.

---

## 📂 Project Structure

```text
ARTVIBE/
├── .gitignore            # Git exclusion guidelines
├── LICENSE               # Open-source MIT License
├── README.md             # Developer documentation
├── index.html            # Main dashboard structural markup
├── css/
│   └── style.css         # Transitions, variable themes, and custom animations
└── js/
    └── plugin.js         # Core application logic and event controls
```

---

## 🎮 Usage Guide

### Browsing & Filtering
- Open the application; the feed will load automatically.
- Click the **Favorites** button in the header nav to display only your favorited artworks. Click **All Posts** to return to the full feed.
- Scroll down to load more artworks automatically.

### Lightbox Inspection
- Click any artwork image to open the lightbox.
- Navigate between cards using the on-screen arrows, or use the **Left/Right Arrow Keys** on your keyboard.
- Close the lightbox by clicking the **&times;** button, clicking outside the image, or hitting the **Escape Key**.

### Theme Toggle
- Click the **Sun/Moon** button in the header to switch visual themes instantly.

---

## 📈 Future Enhancements

- [ ] **Real API Integration**: Connect to professional art APIs like Unsplash or Art Institute of Chicago.
- [ ] **User Uploads**: Allow users to drag and drop their own pictures to render locally.
- [ ] **Search & Categorization**: Search bar and categories filter tags.
- [ ] **CSS Build Steps**: Optimize tailwind builds and minify CSS/JS files.

---

## 👤 Author

**Hazem Taha**
- GitHub: [@HazemTaha2004](https://github.com/HazemTaha2004)
- LinkedIn: [Hazem Taha Profile Placeholder](https://linkedin.com)

---

## 📄 License

Distributed under the MIT License. See [LICENSE](file:///e:/Privet/New%20folder/coding/protofoilo/githup%20improve/ARTVIBE/LICENSE) for more information.
