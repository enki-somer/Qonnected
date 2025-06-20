require("dotenv").config({ path: ".env.local" });
const fetch = require("node-fetch");

async function testNetlifyConnection() {
  const siteId = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_ADMIN_TOKEN;

  console.log("Testing Netlify connection with:");
  console.log("Site ID:", siteId);
  console.log("Token exists:", !!token);

  try {
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("\nAPI Response Status:", response.status);
    console.log("Response Status Text:", response.statusText);

    const data = await response.text();
    console.log("\nResponse Data:", data);
  } catch (error) {
    console.error("\nError testing Netlify connection:", error);
  }
}

testNetlifyConnection();
