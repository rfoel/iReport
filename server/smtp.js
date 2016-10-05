// server/smtp.js
Meteor.startup(function () {
  smtp = {
    username: 'rafaelfr@outlook.com',
    password: 'HAC9YdJvuPWm',
    server:   'mail.smtp2go.com ',
    port: 2525
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});