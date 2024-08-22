/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers(){
        return [
            {
                source: '/:path*',
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*"},
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" }
                ]
            }
        ]
    }
};

export default nextConfig;
