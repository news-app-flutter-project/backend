import axios from 'axios';
import { kakaoIdException } from '@/common/exceptions';

interface IKakaoLogoutRes {}

const logout = async (accessToken: string): Promise<IKakaoLogoutRes> => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://kapi.kakao.com/v1/user/logout',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (err) {
        kakaoIdException(err);
    }
    return {};
};

export default logout;
