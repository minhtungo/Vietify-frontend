const { withStoreConfig } = require('./store-config');
const store = require('./store.config.json');

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'medusa-public-images.s3.eu-west-1.amazonaws.com',
      'localhost',
      'tailwindui.com',
      'images.unsplash.com',
      'i.ibb.co',
      'demo2.pavothemes.com',
      'cdn0.fahasa.com',
      'images-us.bookshop.org',
      '20.12.70.127',
      '127.0.0.1',
    ],
  },
});

console.log('next.config.js', JSON.stringify(module.exports, null, 2));
