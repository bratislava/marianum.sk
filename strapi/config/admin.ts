export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '065a7a5694ad54c2367f907410860dc0'),
  },
});
