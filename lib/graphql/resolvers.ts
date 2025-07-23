import { GraphQLError } from 'graphql';

const DEFAULTS = {
  current_weather: 'true',
  timezone: 'auto',
  hourly:
    'temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky',
  daily:
    'weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max',
};

export const resolvers = {
  Query: {
    myQuery: async (_: unknown, args: Record<string, string>) => {
      try {
        if (!args.latitude || !args.longitude) {
          throw new GraphQLError('latitude and longitude are required', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }

        const params = new URLSearchParams({
          ...DEFAULTS,
          ...args,
        });

        const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          const body = await res.text();
          throw new GraphQLError('Open-Meteo error', {
            extensions: {
              code: 'UPSTREAM_ERROR',
              status: res.status,
              body: body.slice(0, 500),
            },
          });
        }
        return res.json();
      } catch (err: any) {
        // Ensure GraphQL returns a proper error the client can read
        throw new GraphQLError(err.message ?? 'Unknown error', {
          extensions: err.extensions ?? { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },
  },
};