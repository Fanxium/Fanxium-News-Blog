import axios from "axios";

const API_URL = "https://gnews.io/api/v4";
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

// Fetch news by category
export async function fetchTopHeadlines(category = "general", country) {
  const params = {
  apikey: API_KEY,
    lang: "en",
    max: 10,
    category: category,
  };

  if (country) {
    params.country = country;
  }

  const response = await axios.get(`${API_URL}/top-headlines`, {
    params: params,
  });

  return response.data.articles || [];
} 


// Search news using the q query parameter
export async function searchNews(query) {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      apikey: API_KEY,
      q: query,
      lang: "en",
      max: 50,
    },
  });
console.log(response.data);

  return response.data.articles || [];
}
