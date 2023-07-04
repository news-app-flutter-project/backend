import { IKakaoIdRes } from '@/apis/kakao/kakaoId';
import { IKakaoRegisterRes } from '@/apis/kakao/kakaoLogin';

declare global {
    interface IUpdateParams {
        kakao_id: number;
        kakao_access_token: string | null;
        kakao_access_token_expires_in: number | null;
        kakao_access_token_date: Date | null;
        kakao_refresh_token: string | null;
        kakao_refresh_token_expires_in: number | null;
        kakao_refresh_token_date: Date | null;
    }
}

interface IRegisterParams {
    kakao_info_data?: IKakaoIdRes;
    tokenInfo?: IKakaoRegisterRes;
    kakao_id?: kakao_id;
}

export const registerParams = ({
    kakao_info_data,
    tokenInfo,
    kakao_id,
}: IRegisterParams): IUpdateParams => {
    let kakaoData: IUpdateParams = {
        kakao_id: kakao_id!,
        kakao_access_token: null,
        kakao_access_token_expires_in: null,
        kakao_access_token_date: null,
        kakao_refresh_token: null,
        kakao_refresh_token_expires_in: null,
        kakao_refresh_token_date: null,
    };

    if (kakao_info_data && tokenInfo) {
        const currentDate = new Date();
        kakaoData = {
            ...kakaoData, // Keep existing properties
            kakao_id: kakao_info_data.id,
            kakao_access_token: tokenInfo.access_token,
            kakao_access_token_expires_in: tokenInfo.expires_in,
            kakao_access_token_date: currentDate,
            kakao_refresh_token: tokenInfo.refresh_token,
            kakao_refresh_token_expires_in: tokenInfo.refresh_token_expires_in,
            kakao_refresh_token_date: currentDate,
        };
    }

    return kakaoData;
};
