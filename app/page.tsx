'use client';

import Image from 'next/image';
import { Card, Divider, Subtitle, Text } from '@tremor/react';
import { CityPicker } from '@/components/CityPicker';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-custom p-10 flex flex-col justify-center items-center">
      <Card className="max-w-3xl mx-auto">
        <Text className="text-4xl font-bold text-center mb-10">
          CloudCast AI
        </Text>
        <Subtitle className="text-xl text-center">
          Powered by OpenAI, Next.js, Tailwind CSS, Tremor 2.0 + more!
        </Subtitle>
        <Divider className="my-10" />

        <Card className="bg-gradient-custom">
          <CityPicker />
        </Card>
      </Card>
    </main>
  );
}
