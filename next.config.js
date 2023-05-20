/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        infura: process.env.INFURA,
        privateKey: process.env.PRIVATE_KEY,
    },
};

module.exports = nextConfig;
