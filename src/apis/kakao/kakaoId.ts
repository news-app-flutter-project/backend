import axios from "axios";

export interface IKakaoIdRes {
  expiresInMillis: number;
  id: number;
  expires_in: number;
  app_id: number;
  appId: number;
}

/** get new access + refresh token */
const kakaoId = async (accessToken: string) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v1/user/access_token_info",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};

export default kakaoId;
