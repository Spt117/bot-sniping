/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        infura: process.env.infura,
        ankrGoerli: process.env.ankrGoerli,
        privateKey: process.env.privateKey,
    },
};

module.exports = nextConfig;
