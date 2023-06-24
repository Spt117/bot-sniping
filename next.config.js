/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        infuraGoerliWebSocket: process.env.infuraGoerliWebSocket,
        alchemyGoerliWebSocket: process.env.alchemyGoerliWebSocket,
        ankrGoerli: process.env.ankrGoerli,
        private1: process.env.private1,
        private2: process.env.private2,
    },
};

module.exports = nextConfig;
