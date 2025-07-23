import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const {
    latitude,
    longitude,
    hourly = 'temperature_2m',
    daily = 'temperature_2m_max,temperature_2m_min',
    current_weather = 'true',
    timezone = 'auto',
  } = await req.json();

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly,
    daily,
    current_weather,
    timezone,
  });

  const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!weatherRes.ok) {
    return new Response('Weather API error', { status: 500 });
  }
  const weather = await weatherRes.json();

  const prompt = `A visitor wants to know the weather. Introduce yourself as Maya the AI weather assistant and give a very short summary of the weather for the next 24 hours. Be polite and professional. Use the following weather data ${JSON.stringify(
    weather
  )}. Close with a friendly goodbye.`;

  const response = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    stream: true,
    temperature: 0.6,
    max_tokens: 300,
    prompt,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}