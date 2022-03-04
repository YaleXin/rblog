/*
 * @Author      : YaleXin
 * @Email       : 181303209@yzu.edu.cn
 * @LastEditors : YaleXin
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["prismjs", {
      "languages": ["javascript", "css", "markup", "c", "java", "clike", "json", "python", "cpp", "shell", "go"],
      "plugins": ["line-numbers", "show-language", "highlight-keywords", "match-braces","copy-to-clipboard"],
      "theme": "dark", 
      "css": true
    }]
  ]
}
