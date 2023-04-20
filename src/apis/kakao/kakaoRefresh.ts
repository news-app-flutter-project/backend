import axios from "axios";
import qs from "qs";
import { kakaoIdException } from "@/common/exceptions";

declare global {
  interface IKakaoRefreshRes {
    kakao_access_token: string;
    kakao_access_token_expires_in: number;
    kakao_access_token_date: Date;
    kakao_refresh_token?: string | undefined;
    kakao_refresh_token_expires_in?: number | undefined;
    kakao_refresh_token_date?: Date | undefined;
  }
}

// A new refresh token that has been refreshed.
// Possible to refresh only when the validity period is left less than a month.

const refreshTokens = async (
  refreshToken: string
): Promise<IKakaoRefreshRes> => {
  try {
    const currentDate = new Date();
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
    return {
      kakao_access_token: response.data.access_token,
      kakao_access_token_expires_in: response.data.expires_in,
      kakao_access_token_date: currentDate,
      kakao_refresh_token: response.data.refresh_token
        ? response.data.refresh_token
        : undefined,
      kakao_refresh_token_expires_in: response.data.refresh_token_expires_in,
      kakao_refresh_token_date: response.data.refresh_token
        ? currentDate
        : undefined,
    };
  } catch (err) {
    kakaoIdException(err);
  }
  return {
    kakao_access_token: "",
    kakao_access_token_expires_in: 0,
    kakao_access_token_date: new Date(),
    kakao_refresh_token: "",
    kakao_refresh_token_expires_in: 0,
    kakao_refresh_token_date: new Date(),
  };
};

export default refreshTokens;
