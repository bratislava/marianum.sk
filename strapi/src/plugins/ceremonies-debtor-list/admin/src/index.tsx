import pluginId from "./pluginId";
import BulletList from "@strapi/icons/BulletList";

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: BulletList,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Import dlžníkov a obradov",
      },
      Component: async () => {
        return await import(/* webpackChunkName: "[request]" */ "./pages/App");
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    const plugin = {
      id: pluginId,
      isReady: true,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app) {},
};
