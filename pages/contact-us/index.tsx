import { TextInput, Textarea, SimpleGrid, Group, Text, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function GetInTouchSimple() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value: string) => value.trim().length < 2,
      email: (value: string) => !/^\S+@\S+$/.test(value),
      subject: (value: string) => value.trim().length === 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Text fz={48} fw={500} mb={15} ta="center">
        Get in touch
      </Text>

      <Container size={560} p={0}>
        <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
          />
        </SimpleGrid>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          {...form.getInputProps('subject')}
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps('subject')}
        />

        <Group position="center" mt="xl">
          <Button type="submit" size="md">
            Send message
          </Button>
        </Group>
      </Container>
    </form>
  );
}
