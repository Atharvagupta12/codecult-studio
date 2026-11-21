import type { NextConfig } from "next";

/** Safe security headers for a public marketing site (no login, no user data). */
const securityHeaders = [
  // Stop other sites from showing CodeCult inside an iframe (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  // Don't let browsers guess file types
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Share only the domain (not the full URL) with other sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site never needs camera, mic or location
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Always use HTTPS
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
