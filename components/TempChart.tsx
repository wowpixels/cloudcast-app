'use client';
import { AreaChart, Card, Title } from '@tremor/react';

type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
  const hourlyData = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString('en-US', { hour: 'numeric', hour12: false })
    )
    .slice(1, 25);

  const data = hourlyData.map((hour, index) => ({
    time: Number(hour),
    'UV Index': results.hourly.uv_index[index],
    'Temperature (C)': results.hourly.temperature_2m[index],
  }));

  const dataFormatter = (value: number) => `${value}`;

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={['UV Index', 'Temperature (C)']}
        colors={['red', 'amber']}
        minValue={0}
        maxValue={50}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
}

export default TempChart;
