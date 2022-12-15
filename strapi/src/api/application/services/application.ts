/**
 * application service
 */

import { factories } from "@strapi/strapi";
import { applicationShape } from "./application-shared.yup";

export default factories.createCoreService(
  "api::application.application",
  ({ strapi }) =>
    ({
      // Method 1: Creating an entirely new custom service
      async createApplicationCustom({
        data,
        captchaToken,
      }: {
        data: any;
        captchaToken: string;
      }) {
        // TODO: Validate captcha
        try {
          applicationShape.validateSync(data);
        } catch (e) {
          // TODO: Error
          // throw new errors.YupValidationError(e);
          // throw new errors.ApplicationError("Not found", 404);
        }

        const entries = await super.create({
          data: { data: data },
        });

        // TODO: Error
        // TODO: Mailgun

        return JSON.stringify(entries);
      },
      // TODO: Type
    } as any)
);
