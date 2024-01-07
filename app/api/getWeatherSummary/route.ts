import { NextResponse } from 'next/server';
import openai from '@/openai';

export async function POST(request: Request) {
  const { weatherData } = await request.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      n: 1,
      stream: false,
      max_tokens: 200,
      messages: [
        {
          'role': 'system',
          'content': `A visitor wants to know the weather. Introduce yourself as Maya the AI weather assistant and give a short summary of the weather for the next 24 hours. Be polite and professional.`,
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
  } catch (error) {
    return NextResponse.json({
      content:
        "We couldn't get the weather summary from OpenAI, please try again later. Sorry for the inconvenience.",
    });
  }
}
