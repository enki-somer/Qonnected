import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL?.split('@')[1],
  api_key: process.env.CLOUDINARY_URL?.split('//')[1].split(':')[0],
  api_secret: process.env.CLOUDINARY_URL?.split(':')[2].split('@')[0],
});

export async function uploadPaymentProof(base64Image: string, paymentId: string): Promise<string> {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
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