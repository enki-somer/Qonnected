const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

const CERTIFICATION_IMAGES = [
  {
    input: "public/images/Moffice.png",
    output: "public/images/optimized/moffice.webp",
    width: 176,
    height: 176,
  },
  {
    input: "public/images/Adobe.png",
    output: "public/images/optimized/adobe.webp",
    width: 176,
    height: 176,
  },
  {
    input: "public/images/CISCO.png",
    output: "public/images/optimized/cisco.webp",
    width: 176,
    height: 176,
  },
  {
    input: "public/images/ic3.png",
    output: "public/images/optimized/ic3.webp",
    width: 176,
    height: 176,
  },
  {
    input: "public/images/PMI.png",
    output: "public/images/optimized/pmi.webp",
    width: 176,
    height: 176,
  },
  {
    input: "public/images/Fusion.png",
    output: "public/images/optimized/fusion.webp",
    width: 176,
    height: 176,
  },
  {
    input: "public/images/apple-logo.png",
    output: "public/images/optimized/apple.webp",
    width: 312,
    height: 176,
  },
  {
    input: "public/images/AC.png",
    output: "public/images/optimized/ac.webp",
    width: 176,
    height: 176,
  },
];

async function optimizeImages() {
  // Create optimized directory if it doesn't exist
  const optimizedDir = path.join(process.cwd(), "public/images/optimized");
  try {
    await fs.mkdir(optimizedDir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }

  // Process each image
  for (const image of CERTIFICATION_IMAGES) {
    try {
      await sharp(image.input)
        .resize(image.width, image.height, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          withoutEnlargement: true,
          kernel: "lanczos3",
        })
        .webp({
          quality: 95,
          lossless: false,
          effort: 6,
        })
        .toFile(image.output);

      console.log(
        `✓ Optimized: ${path.basename(image.input)} → ${path.basename(image.output)}`
      );
    } catch (err) {
      console.error(`✗ Failed to optimize ${image.input}:`, err);
    }
  }
}

optimizeImages().catch(console.error);
