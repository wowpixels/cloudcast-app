// app/location/[city]/[lat]/[long]/page.tsx
import { headers } from 'next/headers';
import CalloutCard from '@/components/CalloutCard';
import HumidityChart from '@/components/HumidityChart';
import InformationPanel from '@/components/InformationPanel';
import RainChart from '@/components/RainChart';
import StatCard from '@/components/StatCard';
import TempChart from '@/components/TempChart';
import FetchDataAi from '@/components/FetchDataAi';
import cleanData from '@/lib/cleanData';
import Footer from '@/components/Footer';
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries';

export const revalidate = 60;

type RouteParams = { city: string; lat: string; long: string };
type PageProps = { params: RouteParams };

export default async function WeatherPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { city, lat, long } = await params;

  const host = (await headers()).get('host')!;
  const protocol = process.env.VERCEL ? 'https' : 'http';
  const endpoint =
    process.env.NEXT_PUBLIC_GRAPHQL_URL ?? `${protocol}://${host}/api/graphql`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: fetchWeatherQuery,
      variables: {
        latitude: lat,
        longitude: long,
        timezone: 'auto',
        current_weather: 'true',
      },
    }),
    next: { revalidate: 60 },
  });

  // Guard against HTML/error responses
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error(`Non-JSON response (${res.status}): ${text.slice(0, 200)}`);
  }
  const { data, errors } = await res.json();

  if (errors?.length) {
    console.error('GraphQL errors:', errors);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Oops, couldn’t load weather 😕</h1>
          <p className="text-sm opacity-80 mb-4">{errors[0].message}</p>
          <a
            href="/"
            className="underline text-white/90 hover:text-white"
          >
            Try again
          </a>
        </div>
      </div>
    );
  }

  const results: Root = data.myQuery;
  const dataToSend = cleanData(results, city);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-50 md:flex-row">
        <InformationPanel city={city} lat={lat} long={long} results={results} />
        <div className="p-10 flex-1">
          <div className="pb-5">
            <div className="pb-5">
              <h2 className="text-2xl font-bold text-slate-700">Todays Overview</h2>
              <p className="text-sm text-gray-400">
                Last updated at: {new Date(results.current_weather.time).toLocaleString()} ({results.timezone})
              </p>
            </div>

            <div className="mb-10">
              <FetchDataAi dataToSend={dataToSend} />
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              <StatCard title="Maximum Temperature" metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`} color="amber" />
              <StatCard title="Minimum Temperature" metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`} color="sky" />
              <div>
                <StatCard title="UV Index" metric={`${results.daily.uv_index_max[0].toFixed(1)}`} color="red" />
                {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                  <CalloutCard message="High UV today, don't stay too long in the sun and be sure to wear SPF!" warning />
                )}
              </div>
              <div className="flex space-x-3">
                <StatCard title="Wind Speed" metric={`${results.current_weather.windspeed.toFixed(1)} m/s`} color="teal" />
                <StatCard title="Wind Direction" metric={`${results.current_weather.winddirection.toFixed(1)}°`} color="indigo" />
              </div>
            </div>
          </div>

          <hr className="mb-5" />
          <div className="space-y-3">
            <TempChart results={results} />
            <RainChart results={results} />
            <HumidityChart results={results} />
          </div>
        </div>
      </div>
      <div className="py-8 bg-slate-800">
        <Footer />
      </div>
    </>
  );
}