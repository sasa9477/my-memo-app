/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true
}
console.log('process.env.NODE_ENV : ', process.env.NODE_ENV)
console.log('process.env.VERCEL_URL : ', process.env.VERCEL_URL)

module.exports = nextConfig
