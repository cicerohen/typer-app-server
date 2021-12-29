export default () => ({
  port: process.env.PORT || 9000,
  auth: {
    secret: process.env.AUTH_SECRET_PHRASE,
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
});
