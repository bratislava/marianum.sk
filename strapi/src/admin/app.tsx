export default {
  config: {
    locales: ["sk"],

    // Disable video tutorials
    tutorials: false,
    notifications: { release: false },
  },
  bootstrap(app) {
    console.log(app);
  },
};
