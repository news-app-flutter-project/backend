import axios from "axios";
import qs from "qs";
import { kakaoIdException } from "@/common/exceptions";

interface IKakaoRefreshRes {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  id_token?: string;
}

// A new refresh token that has been refreshed.
// Possible to refresh only when the validity period is left less than a month.

const refreshTokens = async (
  refreshToken: string
): Promise<IKakaoRefreshRes> => {
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        grant_type: "refresh_token",
        client_id: process.env.KAKAO_CLIENT_ID,
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (err) {
    kakaoIdException(err);
  }
  return {
    token_type: "",
    access_token: "",
    expires_in: 1,
    refresh_token: "",
    refresh_token_expires_in: 1,
    id_token: "",
  };
};

export default refreshTokens;
