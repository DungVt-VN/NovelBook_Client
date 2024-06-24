import axios from "axios";

const UPLOAD_URL = 'http://localhost:5167/api/images/upload';

export const uploadImageToDrive = async (
  file: File
): Promise<string | null> => {
  try {
    const formData = new FormData();
    console.log("sdf" + file.text);
    formData.append('image', file);

    const response = await axios.post(
      UPLOAD_URL,
      formData
    );

    console.log("Upload successful:", response.data);
    return response.data.imageUrl; // Adjust this based on your server response
  } catch (error) {
    // Handle error appropriately
    if (error instanceof Error) {
      console.error("Error uploading image:", error.message);
    } else {
      console.error("Non-error occurred:", error);
    }
    return null; // Return null or handle error state as per your application's logic
  }
};
