module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'clement_admin1974',
      host : '172.16.116.133',
      ref  : 'origin/main',
      repo : 'https://github.com/clementderyckx/app-grandeur-nature.git',
      path : '/home/clement_admin1974/app-test',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js',
      'pre-setup': ''
    }
  }
};
