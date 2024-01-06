import { Country, City } from 'country-state-city';
import Select from 'react-select';

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

export const CityPicker = () => {
  return (
    <div>
      <Select options={options} />
    </div>
  );
};
