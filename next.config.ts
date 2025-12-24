import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      dns: false,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  // ✅ DISABLE TURBOPACK - GUNA WEBPACK
  turbopack: {}
};

export default nextConfig;
