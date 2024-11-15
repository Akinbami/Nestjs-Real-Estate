module.exports = {
  // enabled logging for development
  logging: true,
  db: {
    seed: true,
    // url: 'mongodb://localhost/fieldstarDevDB',
    url: process.env.DB_URL,
  },
};
