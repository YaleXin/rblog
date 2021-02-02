module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["prismjs", {
      "languages": ["javascript", "css", "markup", "c", "java", "clike", "json", "python"],
      "plugins": ["line-numbers", "show-language", "highlight-keywords", "match-braces","copy-to-clipboard"],
      "theme": "dark", 
      "css": true
    }]
  ]
}
