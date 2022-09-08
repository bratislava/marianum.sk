import { Schema } from "@strapi/strapi";

export default {
  debtor: {
    schema: {
      info: {
        tableName: "debtor",
        singularName: "debtor", // kebab-case mandatory
        pluralName: "debtors", // kebab-case mandatory
        displayName: "Debtors",
        description: "Debtors",
        kind: "collectionType",
      },
      options: {
        draftAndPublish: false,
      },
      pluginOptions: {
        "content-manager": {
          visible: true,
        },
        "content-type-builder": {
          visible: true,
        },
      },
      attributes: {
        graveSection: {
          type: "string",
        },
        graveNumber: {
          type: "string",
        },
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        // Birth dates and death dates are not "date" type because they contain various strings such as single year.
        birthDate: {
          type: "string",
        },
        deathDate: {
          type: "string",
        },
        cemetery: {
          type: "string",
        },
        branch: {
          type: "relation",
          relation: "oneToOne",
          target: "api::branch.branch",
        },
      },
    } as Omit<Schema, "modelType">,
  },
  ceremony: {
    schema: {
      kind: "collectionType",
      collectionName: "ceremonies",
      info: {
        singularName: "ceremony",
        pluralName: "ceremonies",
        displayName: "Ceremonies",
      },
      options: {
        draftAndPublish: false,
      },
      pluginOptions: {
        "content-manager": {
          visible: true,
        },
        "content-type-builder": {
          visible: true,
        },
      },
      attributes: {
        dateTime: {
          type: "datetime",
          required: true,
        },
        name: {
          type: "string",
        },
        birthYear: {
          type: "string",
        },
        type: {
          type: "string",
        },
        company: {
          type: "string",
        },
        officiantProvidedBy: {
          type: "string",
        },
        branch: {
          type: "relation",
          relation: "oneToOne",
          target: "api::branch.branch",
        },
      },
    } as Omit<Schema, "modelType">,
  },
};
