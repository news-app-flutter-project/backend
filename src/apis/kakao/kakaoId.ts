import axios from "axios";
import { kakaoIdException } from "@/common/exceptions";

export interface IKakaoIdRes {
  expiresInMillis: number;
  id: number;
  expires_in: number;
  app_id: number;
  appId: number;
}

/** get new access + refresh token */
const kakaoId = async (accessToken: string): Promise<IKakaoIdRes> => {
  try {
    const response = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v1/user/access_token_info",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err: any) {
    kakaoIdException(err);
  }
  return {
    expiresInMillis: 0,
    id: 0,
    expires_in: 0,
    app_id: 0,
    appId: 0,
  };
};

export default kakaoId;
