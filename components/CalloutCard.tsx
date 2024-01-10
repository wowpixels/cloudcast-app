'use client';

import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid';
import { Callout } from '@tremor/react';

type Props = {
  message: string;
  warning?: boolean;
  notify?: boolean;
  loading?: boolean;
};

const CalloutCard = ({ message, warning, notify, loading }: Props) => {
  return (
    <Callout
      className="mt-4"
      title={message}
      icon={warning ? ExclamationIcon : CheckCircleIcon}
      color={notify ? 'yellow' : loading ? 'blue' : warning ? 'rose' : 'teal'}
    />
  );
};

export default CalloutCard;
