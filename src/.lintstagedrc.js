export default {
  "*.ts": ["prettier --write", "eslint --fix -c ./src/.eslintrc.cjs"],
  "*.md": ["prettier --write", "markdownlint --fix"],
  "*.yml": ["prettier --write"],
};
