import { Alert } from '@mantine/core';
import { IconBulb } from '@tabler/icons';

type InfoCardProps = {
  title: string;
  body: any;
};

function listToString(items: any): string {
  const string = items.join(', ');
  return `${string}.`;
}

export default function InfoCard({ title, body }: InfoCardProps) {
  return (
    <Alert
      icon={<IconBulb size={16} />}
      title={title}
      color="yellow"
      style={{
        width: '60%',
      }}
    >
      <span>{listToString(Object.values(body))}</span>
    </Alert>
  );
}
