/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid flaky dev-time ENOENT chunk resolution in this workspace path.
      config.cache = false;
    }
    return config;
  },
};
module.exports = nextConfig;
