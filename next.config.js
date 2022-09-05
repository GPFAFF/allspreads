// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  // Your existing module.exports
  // Your existing module.exports
  sentry: {
    hideSourceMaps: true,
    authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  },
  images: {
    domains: [
      "static01.nyt.com",
      "cdn.vox-cdn.com",
      "a.espncdn.com",
      "a1.espncdn.com",
      "a2.espncdn.com",
      "a3.espncdn.com",
      "a4.espncdn.com",
      "www.bleachernation.com",
      "profootballtalk.nbcsports.com",
      "static.www.nfl.com",
      "www.si.com",
      "www.elevenwarriors.com",
      "www.nbcsports.com",
      "soccer.nbcsports.com",
      "www.castanet.net",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: "raw-loader",
    });
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
