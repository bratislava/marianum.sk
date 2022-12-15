export default {
  admin: {
    type: "admin",
    routes: [
      {
        method: "PUT",
        path: "/update-debtors",
        handler: "importXlsxController.updateDebtors",
      },
      {
        method: "PUT",
        path: "/update-ceremonies",
        handler: "importXlsxController.updateCeremonies",
      },
      {
        method: "PUT",
        path: "/update-disclosures",
        handler: "importXlsxController.updateDisclosures",
      },
    ],
  },
};
