// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "./cloudinary";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "mern-blog-images",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   } as {
//     folder: string;
//     allowed_formats: string[];
//   },
// });

// const upload = multer({ storage });
// export default upload;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "mern-blog-images",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: file.originalname.split(".")[0] + "-" + Date.now(),
    };
  },
});

const upload = multer({ storage });
export default upload;
