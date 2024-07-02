/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  transpilePackages: ['task-core', 'lodash-es'],
  env: {
    locations: process.env.API_LOCATION
  }
};

module.exports = nextConfig;
