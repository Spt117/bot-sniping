/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        infura: process.env.infura,
        privateKey: process.env.privateKey,
    },
};

module.exports = nextConfig;
