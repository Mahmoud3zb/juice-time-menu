import React from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

interface ProductImageUploadProps {
  imagePreview: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  imagePreview,
  onImageChange,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
      <Avatar
        src={imagePreview}
        variant="rounded"
        sx={{
          width: 76,
          height: 76,
          borderRadius: 2,
          bgcolor: "grey.100",
          border: "2px dashed #cbd5e1",
        }}
      >
        🥤
      </Avatar>
      <Box>
        <Button
          variant="outlined"
          component="label"
          size="small"
          startIcon={<PhotoCamera />}
          sx={{ borderRadius: 1.5, fontWeight: 800, fontSize: "0.8rem" }}
        >
          {imagePreview ? "تغيير الصورة" : "رفع صورة للمشروب"}
          <input
            type="file"
            accept="image/*,.jfif,.avif,.webp,.heic,.jpg,.jpeg,.png,.PNG,.JPG"
            hidden
            onChange={onImageChange}
          />
        </Button>
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 0.5 }}>
          جميع الصيغ مدعومة (JPG, PNG, WebP, صور الفيسبوك وغيرها)
        </Typography>
      </Box>
    </Box>
  );
};
