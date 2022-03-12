/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  env: {
    apiBaseURL: isProduction ? '/api/' : 'http://localhost:3000/api/'
  }
}

console.log('nextConfig ', nextConfig)

module.exports = nextConfig
