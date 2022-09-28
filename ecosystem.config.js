module.exports = {
  apps : [{
    name: 'Me Cute 2',
    script: 'npm start',
    max_memory_restart: '300M',
    cron_restart: '0 0 */30 * *',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
