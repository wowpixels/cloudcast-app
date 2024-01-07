'use client';
import CalloutCard from './CalloutCard';
import getBasePath from '@/lib/getBasePath';
import { useEffect, useState } from 'react';

type Props = {
  dataToSend: {
    city: string;
  };
};

const FetchDataAi = (dataToSend: Props) => {
  const [openAiSummary, setOpenAiSummary] = useState(
    'Loading... Maya is collecting data from OpenAI.'
  );

  useEffect(() => {
    const url = `${getBasePath()}/api/getWeatherSummary`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            weatherData: dataToSend,
          }),
        });
        const json = await response.json();
        setOpenAiSummary(json.content);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, [dataToSend]);

  return <CalloutCard message={openAiSummary} />;
};

export default FetchDataAi;
