'use client';

import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid';
import { Card, Metric, Text, Color } from '@tremor/react';

type Props = {
  title: string;
  metric: string;
  color?: Color;
};

const StatCard = ({ title, metric, color }: Props) => {
  return (
    <Card decorationColor={color} decoration="left">
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  );
};

export default StatCard;
