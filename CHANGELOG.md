# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-07-08

### Added
- Standardized `index.html` structure replacing unstructured template files.
- Added comprehensive repository metadata configurations (`.gitignore`, `LICENSE`, `README.md`).
- Added standard community files (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`).
- Created a robust custom Toast Notification system to support live alerts on UI behaviors.
- Added full keyboard accessibility support (Escape key to close lightbox, Left/Right arrow keys to navigate slides).

### Changed
- Refactored `js/plugin.js` code structure: consolidated theme-switching logics, removed duplicated/conflicting event listeners, and cleaned lightbox slides mapping.
- Enhanced image download utility to handle CORS exceptions gracefully by falling back to new browser tab views.
- Refactored `css/style.css` styles: implemented clear CSS custom variables, set structured animations keyframes, and added responsive active states for filters.

### Removed
- Cleaned up loose template files (`t5 copy 2.html`).
