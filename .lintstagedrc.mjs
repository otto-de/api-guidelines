export default {
  "*.ts": ["prettier --write", "eslint --fix"],
  "*.md": ["prettier --write", "markdownlint --fix"],
  "*.yml": ["prettier --write"],
};
