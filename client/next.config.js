/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:4444/api/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `http://localhost:4444/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
