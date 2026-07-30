import axios from "axios";

import axiosConfig from "@/config/axiosConfig";

export const getCloudinaryUploadSignature = async ({ token }) => {
    const response = await axiosConfig.get("/messages/pre-signed-url", {
        headers: {
            "x-access-token": token,
        },
    });

    return response?.data?.data;
};

export const uploadImageToCloudinary = async ({ credentials, file }) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", credentials.apiKey);
        formData.append("timestamp", credentials.timestamp);
        formData.append("folder", credentials.folder);
        formData.append("signature", credentials.signature);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${credentials.cloudName}/image/upload`,
            formData,
        );

        return response.data.secure_url;
    } catch (error) {
        console.log("Error uploading image to Cloudinary", error);
        throw error;
    }
};
