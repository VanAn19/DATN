/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_ROOT: "http://localhost:4000/v1/api",
        API_KEY: "9425dbb5e4c72c770748b84aa534367f1207268e77c3c39948cd7fc327cf7613dade4fcd40088f9e89bf837cebe3935728c377e5f112a11b6866f238660ac746"
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
