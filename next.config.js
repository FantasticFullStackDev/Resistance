
module.exports = {
  reactStrictMode: true,
  synchronize: false,
  images:{
    domains: ['platform-lookaside.fbsbx.com','dev-web-irlgames.s3.amazonaws.com']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/play/:any*',
        destination: '/play',
      },
    ];
  },
}