const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.transformer.minifierPath = 'metro-minify-terser'
config.transformer.minifierConfig = {
  // Terser options...
}

module.exports = config
