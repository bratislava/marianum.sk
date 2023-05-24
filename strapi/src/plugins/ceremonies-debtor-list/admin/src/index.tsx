import pluginId from "./pluginId";
import { Upload } from "@strapi/icons";

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: Upload,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Import Excel súborov",
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
