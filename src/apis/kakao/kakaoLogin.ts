import axios from 'axios';
import { kakaoRegisterException } from '@/common/exceptions';

export interface IKakaoRegisterRes {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    refresh_token_expires_in: number;
}

/** 아예 새로운 acess + refresh token 발급*/
const kakaoLogin = async (code: string): Promise<IKakaoRegisterRes> => {
    try {
        const response = await axios({
            method: 'get',
            url: `https://kauth.kakao.com/oauth/token?code=${code}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&client_id=${process.env.KAKAO_CLIENT_ID}&grant_type=authorization_code`,
        });
        return response.data;
    } catch (err: any) {
        kakaoRegisterException(err);
    }
    return {
        access_token: '',
        token_type: '',
        refresh_token: '',
        expires_in: 0,
        refresh_token_expires_in: 0,
    };
};

export default kakaoLogin;
