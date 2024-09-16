/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_ROOT: "http://localhost:4000/v1/api",
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res-console.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
