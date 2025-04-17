/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  output: 'export', // needed for Netlify static hosting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        https: false,
        http: false,
        path: false,
        os: false,
        stream: false,
        zlib: false,
        timers: false
      }
    }
    return config
  }
};

module.exports = nextConfig;