const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  images: {
    domains: ['http2.mlstatic.com']
  }
}

module.exports = withPlugins([[withImages]], nextConfig)