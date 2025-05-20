const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

const categories = [
  { name: "Code", arabicName: "برمجة", color: "#6366f1" }, // Indigo for programming
  { name: "Web", arabicName: "تطوير ويب", color: "#3b82f6" }, // Blue for web development
  { name: "Design", arabicName: "تصميم", color: "#f43f5e" },
  { name: "Business", arabicName: "أعمال", color: "#10b981" }, // Emerald for business
  { name: "AI", arabicName: "ذكاء اصطناعي", color: "#8b5cf6" }, // Purple for AI
  { name: "Marketing", arabicName: "تسويق", color: "#f59e0b" }, // Amber for marketing
  { name: "Languages", arabicName: "لغات", color: "#ec4899" }, // Pink for languages
  { name: "Photography", arabicName: "تصوير", color: "#6366f1" },
];

categories.forEach((category) => {
  // Create a 400x400 canvas
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext("2d");

  // Set background
  ctx.fillStyle = "#1a1f2e";
  ctx.fillRect(0, 0, 400, 400);

  // Add a subtle gradient
  const gradient = ctx.createLinearGradient(0, 0, 400, 400);
  gradient.addColorStop(0, `${category.color}33`); // 20% opacity
  gradient.addColorStop(1, `${category.color}00`); // 0% opacity
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);

  // Add category icon (circle with icon-like design)
  ctx.strokeStyle = category.color;
  ctx.lineWidth = 4;

  // Draw main circle
  ctx.beginPath();
  ctx.arc(200, 160, 80, 0, Math.PI * 2);
  ctx.stroke();

  // Add decorative elements based on category
  ctx.beginPath();
  ctx.arc(200, 160, 60, 0, Math.PI * 2);
  ctx.stroke();

  // Add Arabic text
  ctx.fillStyle = category.color;
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText(category.arabicName, 200, 340);

  // Save the image
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(
    path.join(__dirname, `../public/images/${category.name}.png`),
    buffer
  );
});
