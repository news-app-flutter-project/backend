import { v2 as cloudinary } from "cloudinary";

const uploadImageCloud = async (img: string) => {
  try {
    return await cloudinary.uploader.upload(img, {
      use_filename: true,
      folder: "file-upload",
    });
  } catch (err: any) {
    console.log("hi");
    return err;
  }
};

export default uploadImageCloud;
