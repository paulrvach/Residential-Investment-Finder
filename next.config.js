/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'photos.zillowstatic.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
