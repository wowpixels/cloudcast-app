export const typeDefs = /* GraphQL */ `
  type CurrentWeather {
    interval: Float
    is_day: Float
    temperature: Float
    time: String
    weathercode: Float
    winddirection: Float
    windspeed: Float
  }

  type CurrentWeatherUnits {
    interval: String
    is_day: String
    temperature: String
    time: String
    weathercode: String
    winddirection: String
    windspeed: String
  }

  type Daily {
    apparent_temperature_max: [Float]
    apparent_temperature_min: [Float]
    sunrise: [String]
    sunset: [String]
    temperature_2m_max: [Float]
    temperature_2m_min: [Float]
    time: [String]
    uv_index_clear_sky_max: [Float]
    uv_index_max: [Float]
    weathercode: [Float]
  }

  type DailyUnits {
    apparent_temperature_max: String
    apparent_temperature_min: String
    sunrise: String
    sunset: String
    temperature_2m_max: String
    temperature_2m_min: String
    time: String
    uv_index_clear_sky_max: String
    uv_index_max: String
    weathercode: String
  }

  type Hourly {
    apparent_temperature: [Float]
    precipitation: [Float]
    precipitation_probability: [Float]
    rain: [Float]
    relativehumidity_2m: [Float]
    showers: [Float]
    snow_depth: [Float]
    snowfall: [Float]
    temperature_2m: [Float]
    time: [String]
    uv_index: [Float]
    uv_index_clear_sky: [Float]
    windgusts_10m: [Float]
  }

  type HourlyUnits {
    apparent_temperature: String
    precipitation: String
    precipitation_probability: String
    rain: String
    relativehumidity_2m: String
    showers: String
    snow_depth: String
    snowfall: String
    temperature_2m: String
    time: String
    uv_index: String
    uv_index_clear_sky: String
    windgusts_10m: String
  }

  type Root {
    current_weather: CurrentWeather
    current_weather_units: CurrentWeatherUnits
    daily: Daily
    daily_units: DailyUnits
    elevation: Float
    generationtime_ms: Float
    hourly: Hourly
    hourly_units: HourlyUnits
    latitude: Float
    longitude: Float
    timezone: String
    timezone_abbreviation: String
    utc_offset_seconds: Float
  }

  type Query {
    myQuery(
      current_weather: String
      daily: String
      hourly: String
      latitude: String!
      longitude: String!
      timezone: String!
    ): Root
  }
`;