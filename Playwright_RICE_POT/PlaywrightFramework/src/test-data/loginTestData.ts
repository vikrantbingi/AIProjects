export const loginTestData = {
  invalid: {
    email: 'invalid@example.com',
    password: 'WrongPassword123!',
  },
  valid: {
    email: process.env.VWO_USERNAME ?? '',
    password: process.env.VWO_PASSWORD ?? '',
  },
  invalidCredentialsMessage:
    'Your email, password, IP address or location did not match',
};
