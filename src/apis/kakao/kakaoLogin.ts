import axios from "axios";

export interface IKakaoRegisterRes {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
}

/** get new access + refresh token */
const kakaoLogin = async (code: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://kauth.kakao.com/oauth/token?code=${code}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&client_id=${process.env.KAKAO_CLIENT_ID}&grant_type=authorization_code`,
    });
    return response;
  } catch (err: any) {
    return err;
  }
};

export default kakaoLogin;
