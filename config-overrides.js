module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
  };
  return config;
};
