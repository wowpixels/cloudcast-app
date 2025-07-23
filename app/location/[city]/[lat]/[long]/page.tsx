import { getClient } from '@/apollo-client';
import CalloutCard from '@/components/CalloutCard';
import HumidityChart from '@/components/HumidityChart';
import InformationPanel from '@/components/InformationPanel';
import RainChart from '@/components/RainChart';
import StatCard from '@/components/StatCard';
import TempChart from '@/components/TempChart';
import FetchDataAi from '@/components/FetchDataAi';
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries';
import cleanData from '@/lib/cleanData';
import Footer from '@/components/Footer';

export const revalidate = 60;

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

const WeatherPage = async ({ params }: Props) => {
  const { city, lat, long } = params;
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: 'true',
      longitude: long,
      latitude: lat,
      timezone: 'CET',
    },
  });

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h1 className="text-3xl font-bold">Weather data not found</h1>
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
              <h2 className="text-2xl font-bold text-slate-700">
                Todays Overview
              </h2>
              <p className="text-sm text-gray-400">
                Last updated at:{' '}
                {new Date(results.current_weather.time).toLocaleString()} (
                {results.timezone})
              </p>
            </div>
            <div className="mb-10">
              <FetchDataAi dataToSend={dataToSend} />
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              <StatCard
                title="Maximum Temperature"
                metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
                color="amber"
              />
              <StatCard
                title="Minimum Temperature"
                metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
                color="sky"
              />
              <div>
                <StatCard
                  title="UV Index"
                  metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                  color="red"
                />
                {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                  <CalloutCard
                    message="High UV today, don't stay to long in the sun and be sure to wear SPF!"
                    warning
                  />
                )}
              </div>

              <div className="flex space-x-3">
                <StatCard
                  title="Wind Speed"
                  metric={`${results.current_weather.windspeed.toFixed(1)} m/s`}
                  color="teal"
                />
                <StatCard
                  title="Wind Direction"
                  metric={`${results.current_weather.winddirection.toFixed(
                    1
                  )}°`}
                  color="indigo"
                />
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
};

export default WeatherPage;
