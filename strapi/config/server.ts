import { removeCeremoniesTask } from "../src/plugins/ceremonies-debtor-list/remove-ceremonies-cron-task";

export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  cron: {
    enabled: true,
    tasks: { removeCeremoniesTask },
  },
});
