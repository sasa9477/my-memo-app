/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production"

const nextConfig = {
  reactStrictMode: true,
  env: {
    serverURL: isProduction ? "https://my-memo-app-nejdb76yx-sasa9477.vercel.app/" : "http://localhost:3000/"
  }
}

console.log('nextConfig :', nextConfig)

module.exports = nextConfig
