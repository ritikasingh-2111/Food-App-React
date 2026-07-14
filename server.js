const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/restaurants", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Restaurant fetch error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/menu", async (req, res) => {
  const { lat, lng, restaurantId } = req.query;

  try {
    // /mapi/ (mobile API) bypasses AWS WAF challenge that blocks /dapi/
    const response = await axios.get(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Menu fetch error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
