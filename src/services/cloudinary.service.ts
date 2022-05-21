import axios from "axios";

const uploadToCloudinary = (payload: { image: any; upload_preset: string; cloud_name: string }) => {
  const { image, upload_preset, cloud_name } = payload;
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);

 return  axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data)
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.error(err)
        return Promise.reject(err)
    })
};

export const cloudinaryService = {
  uploadToCloudinary,
};
