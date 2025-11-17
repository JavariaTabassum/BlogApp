// import express from "express";
// import upload from "../config/multer";

// const router = express.Router();

// router.post("/", upload.single("image"), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // multer-storage-cloudinary already uploaded to Cloudinary
//     const imageUrl = (req.file as any).path;
//     res.status(200).json({ url: imageUrl });
//   } catch (error) {
//     console.error("❌ Image upload failed:", error);
//     res.status(500).json({ message: "Image upload failed" });
//   }
// });

// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     console.log("➡️ Upload request received");
//     console.log("File:", req.file);
//     console.log("Body:", req.body);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "mern-blog",
//     });

//     console.log("✅ Cloudinary result:", result);

//     fs.unlinkSync(req.file.path);

//     res.status(200).json({ url: result.secure_url });
//   } catch (error) {
//     console.error("❌ Upload failed:", error);
//     res.status(500).json({ message: "Image upload failed", error });
//   }
// });


// export default router;

import express, { Request, Response } from "express";
import upload from "../config/multer";

const router = express.Router();

router.post("/", upload.single("image"), async (req: Request, res: Response) => {
  try {
    console.log("➡️ Upload request received");

    // 👇 Log the file clearly
    console.log("📦 Multer file object:", JSON.stringify(req.file, null, 2));

    if (!req.file) {
      console.log("⚠️ No file found in request");
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Cloudinary URL is in req.file.path
    const imageUrl = (req.file as any).path;
    console.log("✅ Uploaded image URL:", imageUrl);

    res.status(200).json({ url: imageUrl });
  } catch (error: any) {
    console.error("❌ Upload failed:", error);
    res.status(500).json({
      message: "Image upload failed",
      error: error.message || error,
    });
  }
});

export default router;
