module.exports = {
  apps: [
    {
      name: "techbrahmand-server",
      cwd: "./server",
      script: "index.js",
      env: {
        NODE_ENV: "production",
        PORT: 2000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
    },
  ],
};
