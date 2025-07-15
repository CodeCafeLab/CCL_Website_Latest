// ... existing code ...
const nextConfig = {
  // ...other config...
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'placehold.co',
    ],
  },
};
export default nextConfig;

