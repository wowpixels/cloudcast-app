const fetchWeatherQuery = `
  query MyQuery(
    $current_weather: String
    $daily: String = "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max"
    $hourly: String = "temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky"
    $latitude: String!
    $longitude: String!
    $timezone: String!
  ) {
    myQuery(
      current_weather: $current_weather
      daily: $daily
      hourly: $hourly
      latitude: $latitude
      longitude: $longitude
      timezone: $timezone
    ) {
      current_weather {
        interval
        is_day
        temperature
        time
        weathercode
        winddirection
        windspeed
      }
      current_weather_units {
        interval
        is_day
        temperature
        time
        weathercode
        winddirection
        windspeed
      }
      daily {
        apparent_temperature_min
        apparent_temperature_max
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      daily_units {
        apparent_temperature_max
        apparent_temperature_min
        weathercode
        uv_index_max
        uv_index_clear_sky_max
        time
        temperature_2m_min
        temperature_2m_max
        sunset
        sunrise
      }
      elevation
      generationtime_ms
      latitude
      longitude
      timezone
      timezone_abbreviation
      utc_offset_seconds
      hourly_units {
        apparent_temperature
        windgusts_10m
        precipitation_probability
        rain
        relativehumidity_2m
        precipitation
        showers
        snow_depth
        snowfall
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
      }
      hourly {
        apparent_temperature
        precipitation
        precipitation_probability
        rain
        showers
        snowfall
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
        windgusts_10m
        snow_depth
        relativehumidity_2m
      }
    }
  }
`;
export default fetchWeatherQuery;