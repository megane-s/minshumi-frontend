/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
                port: "",
                pathname: "/minshumi-user-content/**",
            },
        ]
    },
    output: "standalone",
}

module.exports = nextConfig
