import { CloudinaryStorage } from "multer-storage-cloudinary";
import { coudenaryupload } from "./cloudenary.config";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: coudenaryupload,
  params: {
    public_id: (req, file) => {
      const fileName = file.originalname
        .toLocaleLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\./g, "-")
        .replace(/[^a-z0-9\-\.]/g, "");
      const extension = file.originalname.split(".").pop();
      const finalUniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileName +
        "." +
        extension;
      return finalUniqueFileName;
    },
  },
});

export const multerUpload = multer({ storage: storage });
