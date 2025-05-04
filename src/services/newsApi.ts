import axios from 'axios';
import { NewsResponse } from '../types/news';

// We'll dynamically compute 'from' and 'to' based on current date (last 24h window)
const getNewsUrl = () => {
  const apiKey = '0c6c235f57dd4164ab2a623b1a1ca40e';
  const now = new Date();
  const to = now.toISOString();
  // one month earlier
  const fromDate = new Date(now);
  fromDate.setMonth(fromDate.getMonth() - 1);
  const from = fromDate.toISOString();
  return `https://newsapi.org/v2/everything?q=health&from=${from}&to=${to}&sortBy=publishedAt&apiKey=${apiKey}`;
};

export const getNews = async (): Promise<NewsResponse> => {
  const url = getNewsUrl();
  const response = await axios.get<NewsResponse>(url);
  return response.data;
}; 