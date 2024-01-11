'use client';
import { Divider, Subtitle } from '@tremor/react';
import { CityPicker } from '@/components/CityPicker';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-slate-700 to-slate-900 p-10 flex flex-col justify-center items-center">
        <main className="max-w-3xl p-2 flex items-center flex-col md:p-12 mx-auto">
          <Image
            src="/cloudcast-icon.svg"
            alt="cloudcast-icon"
            width={80}
            height={80}
          />
          <h1 className="text-4xl font-bold mb-0 text-gradient-custom md:text-6xl">
            CloudCast
          </h1>
          <Subtitle className="text-base text-center !text-slate-500 md:text-lg">
            Your AI powered weather forecast
          </Subtitle>
          <Divider className="my-10" />
          <CityPicker />
        </main>
        <div className="mt-10 md:mt-0">
          <Footer />
        </div>
      </div>
    </>
  );
}
