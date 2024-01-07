import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { CityPicker } from './CityPicker';
import weatherCodeToString from '@/lib/weatherCodeToString';
import { Subtitle } from '@tremor/react';

type Props = {
  city: string;
  lat: string;
  long: string;
  results: Root;
};

const InformationPanel = ({ city, lat, long, results }: Props) => {
  return (
    <div className="bg-gradient-custom p-10 text-white">
      <h1 className="text-3xl font-bold mb-0 text-gradient-custom">
        CloudCast
      </h1>
      <Subtitle className="!text-sm !text-slate-500 md:text-lg">
        Your AI powered weather forecast
      </Subtitle>
      <hr className="mt-10 mb-9 border-slate-500" />
      <div className="pb-5">
        <h1 className="text-3xl font-bold text-slate-100">{decodeURI(city)}</h1>
        <p className="text-xs text-slate-400">
          Long/Lat: {long}, {lat}
        </p>
      </div>

      <CityPicker />

      <hr className="my-10 border-slate-500" />
      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl font-bold">
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="font-extralight text-sm text-slate-400">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="text-xl font-bold">
          {new Date().toLocaleTimeString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
        </p>
      </div>
      <hr className="mt-10 mb-5 border-slate-500" />
      <div>
        <div>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[results.current_weather.weathercode].icon
            }.png`}
            width={75}
            height={75}
            alt="{weatherCodeToString[results.current_weather.weathercode].label}"
          />
          <div className="flex items-center space-x-10">
            <p className="text-4xl font-semibold">
              {results.current_weather.temperature.toFixed(1)} °C
            </p>
            <p className="text-right font-extralight">
              {weatherCodeToString[results.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col w-full items-center justify-between space-y-2">
          <div className="flex w-full items-center px-4 space-x-2 py-3 border border-slate-600 rounded-md bg-white/10">
            <SunIcon className="h-5 w-5 text-yellow-200" />
            <div className="flex w-full justify-between">
              <p className="font-light">Sunrise</p>
              <p className="font-light">
                {new Date(results.daily.sunrise[0]).toLocaleTimeString(
                  'en-GB',
                  {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                  }
                )}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center px-4 space-x-2  py-3 border border-slate-600 rounded-md bg-white/10">
            <MoonIcon className="h-5 w-5 text-white" />
            <div className="flex w-full justify-between">
              <p className="font-light">Sunset</p>
              <p className="font-light">
                {new Date(results.daily.sunset[0]).toLocaleTimeString('en-GB', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;
