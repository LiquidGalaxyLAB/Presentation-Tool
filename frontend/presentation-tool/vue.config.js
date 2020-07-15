module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 8080,
    host: '0.0.0.0'
  },
  pwa: {
    name: 'Presentation Tool',
    themeColor: '#008081',
    manifestOptions: {
      "description": "A tool to create nice presentations using different types of media on a Liquid Galaxy", 
      "short_name": "Presentation Tool", 
      "background_color": "#ffffff", 
      "display": "standalone",
      "start_url": "/",
      "icons": [
        { 
          "src": "/img/icons/android-chrome-192x192.png", 
          "sizes": "192x192", 
          "type": "image/png" 
        }, 
        { 
          "src": "/img/icons/android-chrome-512x512.png", 
          "sizes": "512x512", 
          "type": "image/png" 
        }
      ] 
    },
    workboxPluginMode: 'InjectManifest',
  }
}