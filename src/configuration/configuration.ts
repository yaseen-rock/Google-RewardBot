export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.APP_ENV || 'development',
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  mongoUri: process.env.MONGOOSE_URI,
  rollbar: {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: process.env.ROLLBAR_ENVIRONMENT,
  },
  google: {
    credential: process.env.GOOGLE_CREDENTIALS,
  },
});
