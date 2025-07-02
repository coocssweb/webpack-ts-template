
const { resolve } = require('./utils')
const pages = [

  {
    name: "agreement",
    path: resolve("src/pages", "agreement/index.ts"),
    filename: "agreement.html",
    template: resolve("src/pages", "agreement/index-render.js"),
  }
]

module.exports = pages
