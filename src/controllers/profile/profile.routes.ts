import {
  bodyValidation,
  payloadValidation,
  headersValidation,
} from "@/middlewares/index";

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
      middleware: [],
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
