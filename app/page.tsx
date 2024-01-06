'use client';

import Image from 'next/image';
import { Card, Divider, Subtitle, Text } from '@tremor/react';
import { CityPicker } from '@/components/CityPicker';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-200 p-10 flex flex-col justify-center items-center">
      <Card className="max-w-3xl p-12 mx-auto bg-gradient-custom">
        <Text className="text-5xl font-bold text-center mb-0 text-white">
          CloudCast AI
        </Text>
        <Subtitle className="text-base text-center text-white/60">
          Powered by OpenAI, Next.js, Tailwind CSS, Tremor 2.0 + more!
        </Subtitle>
        <Divider className="my-10" />
        <CityPicker />
      </Card>
    </main>
  );
}
