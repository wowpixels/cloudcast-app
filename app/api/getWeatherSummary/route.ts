import { NextResponse } from 'next/server';
import openai from '@/openai';

export async function POST(request: Request) {
  const { weatherData } = await request.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        'role': 'system',
        'content': `Pretend you're a weather news presenter, presenting live of television. Introduce yourself as Mateo the AI weather assistant. Be energetic and enthusiastic. Then give a summary of the weather for the next 24 hours. Make sure your summary is short.`,
      },
      {
        'role': 'user',
        'content': `Hi there, can I get a summary of todays weather, use the following information to get the weather data ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  return NextResponse.json(response.choices[0].message);
}
