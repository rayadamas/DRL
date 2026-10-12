/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["app", "components", "context", "lib"],
  },
  // Default 60s is too tight when the machine is under load during "Collecting page data"
  staticPageGenerationTimeout: 180,
};

module.exports = nextConfig;
