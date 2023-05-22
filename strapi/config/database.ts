export default ({ env }) => ({
  connection: {
    client: "postgres",
    // https://docs.strapi.io/dev-docs/configurations/database#connection-parameters
    connection: {
      connectionString: "",
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "strapi"),
      password: env("DATABASE_PASSWORD", "password"),
      schema: env("DATABASE_SCHEMA", "public"),
    },
    debug: false,
  },
});
