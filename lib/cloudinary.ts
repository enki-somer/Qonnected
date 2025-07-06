import { v2 as cloudinary } from 'cloudinary';

// Check for required environment variable
if (!process.env.CLOUDINARY_URL) {
  throw new Error('CLOUDINARY_URL environment variable is not set');
}

// Parse Cloudinary URL
const cloudinaryUrl = process.env.CLOUDINARY_URL;
const [protocol, credentials] = cloudinaryUrl.split('//');
const [apiKey, rest] = credentials.split(':');
const [apiSecret, cloudName] = rest.split('@');

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function uploadPaymentProof(base64Image: string, paymentId: string): Promise<string> {
  try {
    // Remove data URL prefix if present
    const imageData = base64Image.includes('base64,') 
      ? base64Image.split('base64,')[1] 
      : base64Image;

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageData}`, {
      folder: 'payment-proofs',
      public_id: paymentId,
      overwrite: true,
      resource_type: 'image',
      format: 'jpg',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
        { width: 1024, crop: 'limit' }
      ]
    });

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

export async function deletePaymentProof(paymentId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(`payment-proofs/${paymentId}`);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
} 