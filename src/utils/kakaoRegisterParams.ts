import { IKakaoIdRes } from "@/apis/kakao/kakaoId";
import { IKakaoRegisterRes } from "@/apis/kakao/kakaoLogin";

declare global {
  interface IUpdateParams {
    kakao_id: number;
    kakao_access_token: string;
    kakao_access_token_expires_in: number;
    kakao_access_token_date: Date;
    kakao_refresh_token: string;
    kakao_refresh_token_expires_in: number;
    kakao_refresh_token_date: Date;
  }
}

export const registerParams = (
  kakao_info_data: IKakaoIdRes,
  tokenInfo: IKakaoRegisterRes
): IUpdateParams => {
  const currentDate = new Date();
  const kakaoData = {
    kakao_id: kakao_info_data.id,
    kakao_access_token: tokenInfo.access_token,
    kakao_access_token_expires_in: tokenInfo.expires_in,
    kakao_access_token_date: currentDate,
    kakao_refresh_token: tokenInfo.refresh_token,
    kakao_refresh_token_expires_in: tokenInfo.refresh_token_expires_in,
    kakao_refresh_token_date: currentDate,
  };
  return kakaoData;
};
