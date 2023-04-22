import {
  bodyValidation,
  payloadValidation,
  tokenValidation,
} from "@/middlewares/index";
import { create_profile } from "./profile.validation";

export function createAuthRoutes(
  path: string,
  createProfileHandler: any,
  getProfileHandler: any,
  updateImageHandler: any
): AuthRoutes {
  return {
    createProfile: {
      method: "post",
      path: `${path}/create_profile`,
      middleware: [tokenValidation(), payloadValidation(create_profile)],
      handler: createProfileHandler,
    },

    getProfile: {
      method: "get",
      path: `${path}/get_profile`,
      middleware: [],
      handler: getProfileHandler,
    },
  };
}
