import { Alert } from '@mantine/core';
import { IconBulb } from '@tabler/icons';

type InfoCardProps = {
  title: string;
  body: any;
};

export default function InfoCard({ title, body }: InfoCardProps) {
  return (
    <Alert icon={<IconBulb size={16} />} title={title} color="red">
      {Object.keys(body).map((key) => (
        <div>
          <h2>{key}</h2>
          <p>{body[key]}</p>
        </div>
      ))}
    </Alert>
  );
}
