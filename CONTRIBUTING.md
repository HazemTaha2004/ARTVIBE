# Contributing to ArtVibe

Thank you for your interest in contributing to ArtVibe! We welcome contributions from developers of all skill levels to help improve this project.

Please review the guidelines below to ensure a smooth contribution process.

---

## 📋 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to the project maintainers.

## 🛠️ How to Contribute

### 1. Reporting Bugs
- Search existing issues to ensure the bug hasn't already been reported.
- Open a new issue with a clear title and description.
- Include steps to reproduce the bug, the expected behavior, and screenshots if applicable.
- Specify your browser and OS.

### 2. Suggesting Enhancements
- Check the [README.md Roadmap](README.md#roadmap) first to see if it is already planned.
- Open an issue describing the proposed feature, why it is useful, and how it might be implemented.

### 3. Submitting Code Changes
- Fork the repository.
- Create a new branch for your feature or bugfix:
  ```bash
  git checkout -b feature/your-feature-name
  # or
  git checkout -b bugfix/your-bugfix-name
  ```
- Make your changes, ensuring code is formatted and adheres to best practices.
- Commit your changes using Conventional Commits guidelines (see below).
- Push to your fork and submit a Pull Request (PR) to the `main` branch of this repository.

---

## ✒️ Coding Standards

To maintain a clean and professional codebase:
- **HTML**: Use semantic HTML tags and keep interactive elements accessible (e.g., provide `aria-label` attribute on icon-only buttons).
- **CSS**: Organize custom CSS under corresponding section comments in `style.css`. Rely on Tailwind utility classes for basic layouts and spacing.
- **JavaScript**: Follow camelCase naming conventions for functions and variables. Clean up any test console logs or temporary code before submitting. Write JSDoc comments for all main functions.

---

## 💬 Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This helps keep a clean, readable history and automates version releases.

Structure your commit messages as:
```text
<type>(<scope>): <description>

[optional body]
```

### Allowed Types:
- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `docs`: Documentation changes only.
- `style`: Changes that do not affect the meaning of the code (formatting, white-space, missing semi-colons, etc.).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `chore`: Changes to build processes, auxiliary tools, or libraries.

### Examples:
- `feat(lightbox): add keyboard navigation arrow keys`
- `fix(theme): correct background flickering on light toggle`
- `docs(readme): add responsive mobile screenshot references`
