/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  // Ensure server components can access external packages
  serverComponentsExternalPackages: [
    'resend',
    '@react-email/components',
    '@react-email/render',
  ],
  // Transpile packages that might have ES modules
  transpilePackages: ['@react-email/components', '@react-email/tailwind', '@react-email/render'],
};

module.exports = nextConfig;
