import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from 'cloudinary-build-url'

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    // console.log("file is successfully uploaded on cloudinary", response);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  try {
    const publicId = extractPublicId(imageUrl)
    await cloudinary.uploader
      .destroy(publicId)
      .then((result) => console.log("Image successfully deleted from cloudinary\n", result));
  } catch (error) {
    console.log("Error: Image could not be deleted from cloudinary.")
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
