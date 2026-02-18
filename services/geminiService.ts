
import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getSmartRecommendations(mood: string, movies: Movie[]): Promise<string[]> {
    try {
      const movieContext = movies.map(m => `${m.title} (${m.genres.join(', ')})`).join('\n');
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on the following movies available in our catalog:
${movieContext}

The user's current mood or preference is: "${mood}"

Select the top 3 most relevant movie titles from the list provided. Return ONLY a JSON array of strings containing the movie titles.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      const text = response.text || '[]';
      return JSON.parse(text);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      return [];
    }
  }

  async predictTrending(movie: Movie): Promise<{ score: number; reason: string }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the potential viral/trending success for the movie: "${movie.title}". 
        Context: ${movie.overview}. 
        Return a JSON object with a "score" (0-100) and a short "reason" why it will trend.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              reason: { type: Type.STRING }
            },
            required: ["score", "reason"]
          }
        }
      });

      return JSON.parse(response.text || '{"score": 50, "reason": "Data unavailable"}');
    } catch (error) {
      return { score: 50, reason: "Unable to calculate at this time." };
    }
  }
}

export const geminiService = new GeminiService();
