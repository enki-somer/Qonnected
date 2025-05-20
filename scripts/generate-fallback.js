const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

// Create a 400x400 canvas
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");

// Set background
ctx.fillStyle = "#1a1f2e";
ctx.fillRect(0, 0, 400, 400);

// Add a subtle gradient
const gradient = ctx.createLinearGradient(0, 0, 400, 400);
gradient.addColorStop(0, "rgba(255, 215, 0, 0.1)"); // Accent color (gold)
gradient.addColorStop(1, "rgba(255, 215, 0, 0)");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 400, 400);

// Add category icon
ctx.strokeStyle = "#FFD700"; // Gold color
ctx.lineWidth = 4;
ctx.beginPath();
ctx.arc(200, 160, 80, 0, Math.PI * 2);
ctx.stroke();

// Add ribbon tails
ctx.beginPath();
ctx.moveTo(160, 220);
ctx.quadraticCurveTo(200, 260, 240, 220);
ctx.stroke();

// Add text
ctx.fillStyle = "#FFFFFF";
ctx.font = "bold 24px Arial";
ctx.textAlign = "center";
ctx.fillText("فئة", 200, 340);

// Save the image
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(
  path.join(__dirname, "../public/images/default-category.png"),
  buffer
);
