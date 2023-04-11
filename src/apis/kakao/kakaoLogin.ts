import axios from "axios";

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
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default kakaoId;
