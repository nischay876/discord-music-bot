module.exports = {
  apps : [{
    name: 'Me Cute',
    script: 'index.js',
    max_memory_restart: '250M',
    cron_restart: '0 0 */30 * *',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}