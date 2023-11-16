import axios from "axios";

export const deleteImage = async (imageLink) => {
  const parts = imageLink.split("/");
  const imageName = parts[parts.length - 1];

  await axios.delete(`/api/upload?image=${imageName}`);
};
