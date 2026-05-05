import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

// ☁️ Upload Image
const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(
            API_PATHS.IMAGE.UPLOAD_IMAGE,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default uploadImage;


// 🧠 Update Profile Image in DB
export const updateProfileImage = async (imageUrl) => {
    try {
        const response = await axiosInstance.put(
            API_PATHS.AUTH.UPDATE_PROFILE_IMAGE || "/api/v1/auth/update-profile-image",
            { profileImageUrl: imageUrl }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating profile image:", error);
        throw error;
    }
};