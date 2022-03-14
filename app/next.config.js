/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'lh3.googleusercontent.com', 'i.pinimg.com'],
  },
}

module.exports = nextConfig
