import { Alert } from '@mantine/core';
import { IconBulb } from '@tabler/icons';

type InfoCardProps = {
  title: string;
  body: any;
};

export default function InfoCard({ title, body }: InfoCardProps) {
  return (
    <Alert icon={<IconBulb size={16} />} title={title} color="yellow">
      {Object.keys(body).map((key) => (
        <span>
          <span>{key}</span>: <span>{body[key]}</span> {'   '}
        </span>
      ))}
    </Alert>
  );
}
