import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryException } from '@/common/exceptions';

export interface ICloudinaryRes {
    secure_url: string;
}

const uploadImageCloud = async (img: string): Promise<ICloudinaryRes> => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(img, {
            use_filename: true,
            folder: 'file-upload',
        });
        return { secure_url };
    } catch (err: any) {
        console.log('cloud error');
        cloudinaryException(err);
    }
    return {
        secure_url: '',
    };
};

export default uploadImageCloud;
