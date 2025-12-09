# Contributing to Inshorts University Announcement Platform

Thank you for your interest in contributing! We welcome contributions from the community to make this project better.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, browser)

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature already exists or is being worked on
- Clearly describe the feature and its benefits
- Provide examples or mockups if possible

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/Parvaggarwal01/Inshorts.git
   cd Inshorts
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**
   ```bash
   npm run install:all
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

## 📝 Coding Standards

### General Guidelines

- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic
- Remove console.logs before committing
- Handle errors gracefully

### JavaScript/React

- Use ES6+ syntax
- Prefer functional components with hooks
- Use async/await over promises
- Follow React best practices
- Keep components reusable

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Ensure responsive design

### Git Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat(dashboard): add announcement editing functionality
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

## 🧪 Testing

Before submitting a PR:

1. Test all user flows
2. Check both teacher and student roles
3. Verify mobile responsiveness
4. Test with AI features enabled/disabled
5. Check for console errors
6. Verify environment variables work

## 🏗️ Project Structure

```
client/src/
  ├── pages/          # Route components
  ├── components/     # Reusable components (if any)
  ├── App.jsx         # Main routing
  └── main.jsx        # Entry point

server/
  ├── models/         # Mongoose schemas
  ├── routes/         # Express routes
  ├── services/       # Business logic
  └── server.js       # Entry point
```

## 🔍 Code Review Process

1. All PRs require review before merging
2. Address review comments promptly
3. Keep PRs focused and atomic
4. Update documentation if needed
5. Ensure CI checks pass

## 🚫 What NOT to Do

- Don't commit `.env` files with secrets
- Don't include `node_modules` or build folders
- Don't make breaking changes without discussion
- Don't submit incomplete features
- Don't ignore linting errors

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Conventional Commits](https://www.conventionalcommits.org)

## 💬 Questions?

Feel free to:
- Open an issue for questions
- Start a discussion on GitHub
- Reach out to maintainers

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
