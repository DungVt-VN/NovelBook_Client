import axios from "axios";

const UPLOAD_URL = "http://localhost:5167/api/images/upload";

export const uploadImageToDrive = async (
  file: File
): Promise<string | null> => {
  try {
    console.log("Uploading ...");
    const formData = new FormData();
    console.log("sdf" + file.text);
    formData.append("file", file);

    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      console.log(response.data.url);
    } else {
      console.error("Error uploading file:", response.data);
    }
    return response.data.url;
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
