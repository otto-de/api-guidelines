export default {
  "*.ts": ["prettier --write", "eslint --fix"],
  "*.md": ["prettier --write", "markdownlint"],
  "*.yml": ["prettier --write"],
};
