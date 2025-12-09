const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSummary = async (text) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in .env file");
    }
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Summarize the following university announcement into exactly 60 words, keeping the key information intact. Make it engaging for students. \n\nAnnouncement: ${text}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error Details:", JSON.stringify(error, null, 2));
    console.error("Original Error:", error);
    return "Summary generation failed. Please check server logs for details.";
  }
};

const generateImage = async (title, tags = []) => {
  console.log("Generating image for:", title, "with tags:", tags);
  
  // Try Unsplash first (free, no key required)
  try {
    const keywords = tags.length > 0 ? tags.join(" ") : title;
    const searchQuery = encodeURIComponent(keywords);
    const randomPage = Math.floor(Math.random() * 3) + 1; // Random page 1-3 for variety
    
    console.log("Fetching from Unsplash with query:", keywords);
    const response = await fetch(
      `https://source.unsplash.com/1600x900/?${searchQuery}`,
      { redirect: 'follow' }
    );
    
    if (response.ok && response.url) {
      console.log("Unsplash image fetched successfully:", response.url);
      return response.url;
    }
  } catch (error) {
    console.error("Unsplash Error:", error);
  }
  
  // Try Pexels API if available
  if (process.env.PEXELS_API_KEY) {
    try {
      const keywords = tags.length > 0 ? tags.join(" ") : "university education students";
      const searchQuery = encodeURIComponent(keywords);
      const randomPage = Math.floor(Math.random() * 5) + 1; // Get random page for variety
      
      console.log("Fetching from Pexels with query:", keywords);
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&page=${randomPage}&orientation=landscape`,
        {
          headers: {
            Authorization: process.env.PEXELS_API_KEY
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          console.log("Pexels image fetched successfully");
          return data.photos[0].src.large2x;
        }
      }
    } catch (error) {
      console.error("Pexels API Error:", error);
    }
  }
  
  // Fallback: Use Picsum for random high-quality photos
  console.log("Using Picsum fallback");
  const seed = encodeURIComponent(title + Date.now()); // Add timestamp for different images
  return `https://picsum.photos/seed/${seed}/1600/900`;
};

module.exports = { generateSummary, generateImage };
