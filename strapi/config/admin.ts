export default ({ env }) => ({
  auth: {
    secret: env(
      "ADMIN_JWT_SECRET",
      "kwS4BcwWo5Rhua56GQalX4lx5YKtXxNPdBZjUTSocYw="
    ),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "AvxgQLV1GwNkgzOJ6xo+7li2uLSYGwmwZ22MUq514v8="),
  },
});
