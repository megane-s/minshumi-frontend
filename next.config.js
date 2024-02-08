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
    webpack: (config) => {
        config.resolve.alias.canvas = false
        return config
    },
}

module.exports = nextConfig
