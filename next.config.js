/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production"

const nextConfig = {
  reactStrictMode: true,
  env: {
    serverURL: isProduction ? process.env.VERCEL_URL : "http://localhost:3000/"
  }
}

console.log('nextConfig :', nextConfig)

module.exports = nextConfig
