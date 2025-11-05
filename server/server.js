import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import userRouter from './routes/user.js'
import contactRouter from './routes/contact.js'
import testimonialRouter from './routes/testimonial.js'

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

app.use('/user', userRouter);
app.use('/contact', contactRouter);
app.use('/testimonial', testimonialRouter);

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Optional: Unsplash for realistic location images
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
async function fetchUnsplashImage(topic) {
  if (!UNSPLASH_ACCESS_KEY) return null;
  try {
    const params = new URLSearchParams({
      query: `${topic} landmark cityscape`,
      per_page: "1",
      orientation: "landscape",
    });
    const resp = await fetch(`https://api.unsplash.com/search/photos?${params.toString()}`, {
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    const url = data?.results?.[0]?.urls?.regular || data?.results?.[0]?.urls?.full || null;
    return url;
  } catch (e) {
    console.warn("Unsplash fetch failed:", e.message);
    return null;
  }
}

// POST /api/itinerary
app.post('/api/itinerary', async (req, res) => {
  const { travelingFrom, travelingTo, travelDate, returnDate } = req.body;

  if (!travelingFrom || !travelingTo || !travelDate || !returnDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Ask OpenAI to generate itinerary
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // cheaper/faster model
      messages: [
        {
          role: "system",
          content: "You are a travel planner AI. Generate structured itineraries in JSON format."
        },
        {
          role: "user",
          content: `Plan a day-by-day travel itinerary from ${travelingFrom} to ${travelingTo} starting on ${travelDate} and returning on ${returnDate}. 
          Include for each day: date, activities (name, time, description, location). Return JSON only.`
        }
      ],
      response_format: { type: "json_object" }, // ensures proper JSON
    });

    const aiResponse = completion.choices[0].message.content;
    if (!aiResponse) {
      return res.status(502).json({ error: "Empty response from AI" });
    }

    // Parse JSON response
    const ai = JSON.parse(aiResponse);

    // Normalize various AI schemas into a days[] array
    let days = [];
    if (Array.isArray(ai)) {
      days = ai;
    } else if (Array.isArray(ai?.itinerary)) {
      days = ai.itinerary;
    } else if (Array.isArray(ai?.days)) {
      days = ai.days;
    } else if (Array.isArray(ai?.itinerary?.itinerary)) {
      days = ai.itinerary.itinerary;
    } else if (Array.isArray(ai?.itinerary?.days)) {
      days = ai.itinerary.days;
    }

    // Fallback: if AI returned no days, serve local sample itinerary
    if (!days.length) {
      try {
        const samplePath = path.join(__dirname, '..', 'ItineraryData.json', 'ItineraryData.json');
        const file = fs.readFileSync(samplePath, 'utf-8');
        // Attempt to parse JSON; if this is not valid JSON, fall through to inline sample
        const sample = JSON.parse(file);
        if (Array.isArray(sample)) days = sample;
        else if (Array.isArray(sample?.itinerary)) days = sample.itinerary;
        else if (Array.isArray(sample?.days)) days = sample.days;
      } catch (e) {
        console.warn('Sample itinerary load failed:', e.message);
      }
    }

    // Final fallback: minimal inline itinerary to avoid empty responses
    if (!days.length) {
      const start = travelDate || new Date().toISOString().slice(0, 10);
      days = [
        {
          date: start,
          activities: [
            { name: `Arrival in ${travelingTo || 'Destination'}`, time: '09:00', description: 'Begin your trip.', location: travelingTo || 'Destination' },
            { name: 'City highlights', time: '14:00', description: 'Explore key attractions.', location: travelingTo || 'City Center' },
          ],
        },
      ];
    }
    const getPrimaryTopic = (day) => {
      if (!day || !Array.isArray(day.activities)) return "travel";
      for (const activity of day.activities) {
        if (activity?.location) {
          // Prefer full landmark/location string for better realism
          const full = String(activity.location).trim();
          if (full) return full;
        }
      }
      // fallback to any activity name
      const named = day.activities.find(a => a?.name)?.name;
      return named || "travel";
    };
    const withImages = await Promise.all(days.map(async (day) => {
      const topic = getPrimaryTopic(day);
      const destinationHint = travelingTo || "";
      // Prefer realistic, location-based images from Unsplash when configured
      const unsplash = await fetchUnsplashImage(`${topic} ${destinationHint}`.trim());
      const seed = encodeURIComponent(`${topic}-landmark-cityscape`);
      const fallback = `https://picsum.photos/seed/${seed}/800/600`;
      const image = unsplash || fallback;
      return { ...day, image };
    }));

    const enriched = { ...ai, itinerary: withImages };

    return res.json({ success: true, itinerary: enriched });

  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

app.listen(PORT, () => {
  sequelize.sync();
  console.log(`Itinerary API server running on http://localhost:${PORT}`);
});

