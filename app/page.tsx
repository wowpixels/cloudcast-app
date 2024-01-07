'use client';

import { Divider, Subtitle, Title } from '@tremor/react';
import { CityPicker } from '@/components/CityPicker';
import Footer from '@/components/Footer';
export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-slate-700 to-slate-900 p-10 flex flex-col justify-center items-center">
        <main className="max-w-3xl p-2 md:p-12 mx-auto">
          <Title className="!text-5xl font-bold text-center mb-0 !text-white/80">
            CloudCast
          </Title>
          <Subtitle className="text-base text-center !text-white/60">
            Powered by OpenAI, Next.js, Tailwind CSS, Tremor 2.0 + more!
          </Subtitle>
          <Divider className="my-10" />
          <CityPicker />
        </main>
        <Footer />
      </div>
    </>
  );
}
