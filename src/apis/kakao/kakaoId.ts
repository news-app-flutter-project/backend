import axios from "axios";

/** get new access + refresh token */
const kakaoLogin = async (code: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://kauth.kakao.com/oauth/token?code=${code}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&client_id=${process.env.KAKAO_CLIENT_ID}&grant_type=authorization_code`,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default kakaoLogin;
