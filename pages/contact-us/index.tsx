// This code exports a React functional component that creates a contact form with fields for the user's name, email, subject, and message. The form uses the useForm hook from the @mantine/form library to handle form submission and validation. The handleSumbit function is called when the form is submitted, which sends an email to the specified address using the sendCustomerEmail function. If the email is sent successfully, a success notification is shown using the showNotification function from the @mantine/notifications library. If there is an error with sending the email, an error notification is shown instead. The form layout is created using the SimpleGrid, Group, Text, Button, and Container components from the @mantine/core library.

import { TextInput, Textarea, SimpleGrid, Group, Text, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons';
import sendCustomerEmail from '../../helper-functions/send-mail';

/*
  State for the contact us form
  - name: string
  - email: string
  - subject: string
  - message: string
  Name Email and subject are required fields and are validated here.
*/
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

  /*
    Function to handle the submit for the contact us form
  */
  const handleSumbit = async () => {
    try {
      sendCustomerEmail(
        'iimpro.smtp@gmail.com',
        'iimpro.contact.us@gmail.com',
        form.values.subject,
        form.values.message,
        form.values.email,
        form.values.name,
      ).then((response) => {
        if (response.error) {
          form.reset();
          showNotification({
            title: response.title,
            message: response.message,
            color: 'red',
            autoClose: 5000,
            icon: <IconAlertCircle />,
          });
        } else {
          form.reset();
          showNotification({
            title: 'Message sent',
            message: 'Thank you for contacting us, we will get back to you as soon as possible.',
            color: 'teal',
            autoClose: 5000,
          });
        }
      });
    } catch (error) {
      form.reset();
      showNotification({
        title: 'Message not sent',
        message: 'Something went wrong, please try again later.',
        color: 'red',
        autoClose: 5000,
        icon: <IconAlertCircle />,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(() => handleSumbit())}>
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
          {...form.getInputProps('message')}
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
