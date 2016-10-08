module.exports = {
  servers: {
    one: {
      host: '52.24.179.156',
      username: 'ubuntu',
      pem: '/home/vagrant/.ssh/iReport2.pem'
    }
  },

  meteor: {
    name: 'iReport',
    path: '/vagrant/ireport',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://ec2-52-24-179-156.us-west-2.compute.amazonaws.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 100
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};