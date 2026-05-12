/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:"covers.openlibrary.org",
        pathname:'/b/**'
      },
    ],
  },
};

export default nextConfig;
