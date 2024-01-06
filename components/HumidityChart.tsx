'use client';
import { AreaChart, Card, Title } from '@tremor/react';

type Props = {
  results: Root;
};

function HumidityChart({ results }: Props) {
  const hourlyData = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString('en-US', { hour: 'numeric', hour12: false })
    )
    .slice(1, 25);

  const data = hourlyData.map((hour, index) => ({
    time: Number(hour),
    'Humidity (%)': results.hourly.relativehumidity_2m[index],
  }));

  const dataFormatter = (value: number) => `${value} %`;

  return (
    <Card>
      <Title>Chances of Rain</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={['Humidity (%)']}
        colors={['teal']}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default HumidityChart;
