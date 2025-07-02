
const { resolve } = require('./utils')
const pages = [
  {
    name: "agreement",
    path: resolve("src/pages", "agreement/index.ts"),
    filename: "agreement.html",
    template: resolve("src/pages", "agreement/index-render.js"),
  },
   {
    name: "agreement2",
    path: resolve("src/pages", "agreement2/index.ts"),
    filename: "agreement2.html",
    template: resolve("src/pages", "agreement2/index-render.js"),
  },
   {
    name: "agreement3",
    path: resolve("src/pages", "agreement3/index.ts"),
    filename: "agreement3.html",
    template: resolve("src/pages", "agreement3/index-render.js"),
  },
   {
    name: "agreement4",
    path: resolve("src/pages", "agreement4/index.ts"),
    filename: "agreement4.html",
    template: resolve("src/pages", "agreement4/index-render.js"),
  },
   {
    name: "agreement5",
    path: resolve("src/pages", "agreement5/index.ts"),
    filename: "agreement5.html",
    template: resolve("src/pages", "agreement5/index-render.js"),
  }

]

module.exports = pages
