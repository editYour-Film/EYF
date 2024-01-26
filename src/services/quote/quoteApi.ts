import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EYF_API,
  headers: {

  }
});

export const createQuote = async () => {  
  try {
    const response = await apiService.post('/quotes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface calculateQuotePrice {
  complexity: 'basic' | 'medium' | 'complex',
  rushTotalMinutes: number,
  videoExpectedMinutes: number
}

export const calculateQuotePrice = async ({complexity, rushTotalMinutes, videoExpectedMinutes}: calculateQuotePrice) => {  
  try {
    const response = await apiService.post('/quotes/calculate', {
      complexity: complexity,
      rushTotalMinutes: rushTotalMinutes,
      videoExpectedMinutes: Math.max(videoExpectedMinutes, 1)
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};