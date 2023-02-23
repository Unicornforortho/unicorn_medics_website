import { Container } from '@mantine/core';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <Container size="xl">{children}</Container>;
}
