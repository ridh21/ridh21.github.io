import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Upload a base64 or buffer image to Cloudinary.
 * Returns the secure URL + public_id.
 */
export async function uploadImage(
  fileBase64: string,
  folder: string = "portfolio"
): Promise<{ url: string; publicId: string; width: number; height: number }> {
  const result = await cloudinary.uploader.upload(fileBase64, {
    folder,
    resource_type: "image",
    transformation: [
      { quality: "auto", fetch_format: "auto" },
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

/**
 * Delete an image from Cloudinary by public_id.
 */
export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

/**
 * Generate an optimized Cloudinary URL with transformations.
 */
export function getOptimizedUrl(
  publicId: string,
  options: { width?: number; height?: number; crop?: string } = {}
): string {
  return cloudinary.url(publicId, {
    quality: "auto",
    format: "auto",
    width: options.width,
    height: options.height,
    crop: options.crop || "fill",
    secure: true,
  });
}
