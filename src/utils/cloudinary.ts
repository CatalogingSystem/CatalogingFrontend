export const uploadImage = async (data: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", data);
  formData.append("upload_preset", "tenant");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dq75yi9su/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(response)
    const result = await response.json();

    if (response.ok) {
      return result.secure_url;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};
