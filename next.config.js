/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["content.benoit.fage.fr"],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
