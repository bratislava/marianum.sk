export default {
  admin: {
    type: "admin",
    routes: [
      {
        method: "PUT",
        path: "/update-debtors",
        handler: "debtorsCeremoniesController.updateDebtors",
      },
      {
        method: "PUT",
        path: "/update-ceremonies",
        handler: "debtorsCeremoniesController.updateCeremonies",
      },
    ],
  },
};
