import { payloadValidation, tokenValidation } from "@/middlewares/index";
import { create_profile } from "./profile.validation";

export function createAuthRoutes(
  path: string,
  createProfileHandler: any,
  getProfileHandler: any,
  updateImageHandler: any,
  updateScreenModeHandler: any
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
      middleware: [tokenValidation()],
      handler: getProfileHandler,
    },
    updateImage: {
      method: "put",
      path: `${path}/update_img`,
      middleware: [tokenValidation()],
      handler: updateImageHandler,
    },
    updateScreen: {
      method: "put",
      path: `${path}/update_screen`,
      middleware: [tokenValidation()],
      handler: updateScreenModeHandler,
    },
  };
}
