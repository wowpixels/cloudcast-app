'use client';

import { Country, City } from 'country-state-city';
import Select from 'react-select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlobeIcon } from '@heroicons/react/solid';

type option = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

export const CityPicker = () => {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label id="country" htmlFor="country">
            Country
          </label>
        </div>
        <Select
          id="country"
          className="text-black"
          value={selectedCountry}
          instanceId="country"
          onChange={handleSelectedCountry}
          options={options}
          aria-label="Select your Country"
          placeholder="Select your Country"
        />
      </div>
      {/* Show city picker if a country is selected */}
      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2 text-white">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label id="city" htmlFor="city">
              City
            </label>
          </div>
          <Select
            id="city"
            className="text-black"
            value={selectedCity}
            instanceId="city"
            onChange={handleSelectedCity}
            aria-label="Select your City"
            placeholder="Select your City"
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((city) => ({
              value: {
                latitude: city.latitude || '',
                longitude: city.longitude || '',
                countryCode: city.countryCode,
                name: city.name,
                stateCode: city.stateCode,
              },
              label: city.name,
            }))}
          />
        </div>
      )}
    </div>
  );
};
