module.exports = {
  "extension": ["ts"],
  "require": "ts-node/register",
  "spec": ["./test/**/*.ts"],
  "exclude": "src/generated/validators.js",
  "forbid-only": true
}

