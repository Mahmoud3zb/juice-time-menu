import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Sanitize original filename to remove non-ASCII, spaces, and punctuation for safe public_id
        const cleanName = (file.originalname || "image")
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-zA-Z0-9_-]/g, "_")
            .substring(0, 30);
        const uniqueId = `product_${Date.now()}_${cleanName || "img"}`;

        return {
            folder: "Juice-Time",
            public_id: uniqueId,
            allowed_formats: [
                "jpg", "jpeg", "png", "webp", "jfif", "avif", "gif", "bmp", "heic",
                "JPG", "JPEG", "PNG", "WEBP", "JFIF", "AVIF", "GIF", "BMP", "HEIC"
            ],
            transformation: [{ quality: "auto", fetch_format: "auto" }]
        };
    },
});

export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype.startsWith("image/") ||
            /\.(jpg|jpeg|png|webp|jfif|avif|gif|bmp|heic)$/i.test(file.originalname)
        ) {
            cb(null, true);
        } else {
            cb(new Error("صيغة الملف غير مدعومة، يرجى اختيار صورة صالحة (JPG, PNG, WebP, إلخ)"));
        }
    }
});

/**
 * Middleware wrapper that catches Multer and Cloudinary upload errors
 * and returns clean user-friendly 400 responses
 */
export const uploadProductImage = (req: Request, res: Response, next: NextFunction) => {
    upload.single("image")(req, res, (err: any) => {
        if (err) {
            console.error("Upload error caught:", err);
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    success: false,
                    message: "حجم الصورة كبير جداً، يرجى اختيار صورة أصغر من 10 ميجابايت."
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message || "حدث خطأ أثناء معالجة الصورة، يرجى التأكد من صلاحية الملف."
            });
        }
        next();
    });
};