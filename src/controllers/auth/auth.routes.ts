import {
  validationMiddleware,
  checkAuthHeaders,
  validationPayload,
} from "@/middlewares/index";
import { login, register } from "./authFinal.validation";

declare global {
  type AuthRoutes = {
    [key: string]: IRouteOptions;
  };
}

export function createAuthRoutes(
  path: string,
  loginHandler: any,
  logoutHandler: any,
  tokenLoginHandler: any,
  refreshTokensHandler: any
): AuthRoutes {
  return {
    login: {
      method: "post",
      path: `${path}/login`,
      middleware: [validationMiddleware(login)],
      handler: loginHandler,
    },
    logout: {
      method: "post",
      path: `${path}/logout`,
      middleware: [checkAuthHeaders()],
      handler: logoutHandler,
    },
    token_login: {
      method: "post",
      path: `${path}/token_login`,
      middleware: [checkAuthHeaders()],
      handler: tokenLoginHandler,
    },
    refresh_tokens: {
      method: "post",
      path: `${path}/refresh_tokens`,
      middleware: [checkAuthHeaders()],
      handler: refreshTokensHandler,
    },
  };
}
