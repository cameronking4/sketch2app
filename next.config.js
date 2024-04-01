/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/cameronking4/sketch2code',
        permanent: false,
      },
      {
        source: '/deploy',
        destination: 'https://vercel.com/templates',
        permanent: false,
      },
    ];
  },
};
