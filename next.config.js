/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production"

const nextConfig = {
  reactStrictMode: true,
  env: {
    serverURL: isProduction ? "https://my-memo-app-ptm8qm1p5-sasa9477.vercel.app/" : "http://localhost:3000/"
  }
}

module.exports = nextConfig
