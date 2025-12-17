/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Externalize resend and its nested dependencies to prevent bundling issues
    if (isServer) {
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push('resend');
      } else {
        config.externals = [config.externals, 'resend'];
      }
    }
    
    return config;
  },
  // Transpile packages that might have ES modules
  transpilePackages: ['@react-email/components', '@react-email/tailwind'],
};

module.exports = nextConfig;
