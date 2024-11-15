module.exports = {
  // disbable logging for production
  logging: false,
  db: {
    seed: false,
    // url: 'mongodb://localhost/fieldstarDevDB',
    url: process.env.DB_URL_PROD,
  }
};
