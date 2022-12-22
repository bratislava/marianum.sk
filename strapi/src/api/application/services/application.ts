/**
 * application service
 */

import { factories } from "@strapi/strapi";
import { errors } from "@strapi/utils";

import { applicationShape } from "./application-shared.yup";
import Turnstile from "cf-turnstile";

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
        const turnstile = Turnstile(
          process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
        );

        const turnstileResult = await turnstile(captchaToken);

        if (!turnstileResult.success) {
          throw new errors.ApplicationError("Captcha error", 404);
        }

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
