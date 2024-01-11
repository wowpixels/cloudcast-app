import { SunIcon } from '@heroicons/react/solid';

const Loading = () => {
  return (
    <div className="bg-gradient-custom min-h-screen flex flex-col items-center justify-center text-white px-8 md:px-0">
      <SunIcon
        className="h-24 w-24 animated-bounce text-yellow-500"
        color="yellow"
      />
      <h1 className="text-4xl font-bold text-center mb-2 animate-pulse">
        Loading Weather Information
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse">
        Hold on, we are getting the data for you.
      </h2>
    </div>
  );
};

export default Loading;
