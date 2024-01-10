'use client';
import CalloutCard from './CalloutCard';
import getBasePath from '@/lib/getBasePath';
import { useEffect } from 'react';
import { useCompletion } from 'ai/react';

type Props = {
  dataToSend: {
    city: string;
  };
};

const FetchDataAi = (dataToSend: Props) => {
  const { complete, completion, isLoading, error } = useCompletion({
    api: `${getBasePath()}/api/completion`,
  });

  const prompt = JSON.stringify({
    weatherData: dataToSend,
  });

  useEffect(() => {
    complete(prompt);
  }, [complete, prompt]);

  return (
    <div>
      {isLoading && (
        <CalloutCard
          loading
          message="Loading... Maya is collecting data from OpenAI."
        />
      )}
      {completion && !isLoading ? <CalloutCard message={completion} /> : ''}
      {error && (
        <CalloutCard
          notify
          message="Hi this is Maya, your AI weather assistant. I have run out of credits at OpenAI and can not use the OpenAI data to provide you with a summary. The data on this page is still accurate. I will be back soon."
        />
      )}
    </div>
  );
};

export default FetchDataAi;
