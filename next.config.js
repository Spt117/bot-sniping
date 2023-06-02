/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        infuraGoerliWebSocket: process.env.infuraGoerliWebSocket,
        alchemyGoerliWebSocket: process.env.alchemyGoerliWebSocket,
    },
};

module.exports = nextConfig;
