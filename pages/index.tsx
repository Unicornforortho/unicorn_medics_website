// This is a React functional component called "Index" that renders the content of the homepage of a website.

// The component uses the Mantine UI library to render a container with some text inside it. The "greetByTime" function determines the time of day and greets the user accordingly. The "useEffect" hook is used to authenticate the user's session and store the session data in local storage. Finally, the component renders some text about the creator of the website and his work in the field of orthopedics and medical research.

import { Text, Container, Image } from '@mantine/core';
import { useEffect, useState } from 'react';
import supabaseClient from '../supabase';
import useStore from '../store/store';
import EmailBanner from '../components/homepage-banner/index';
import getRegisteredUsers from '../helper-functions/get-registered-users';
import getNumberOfUserUploads from '../helper-functions/get-total-predictions';
import StatsGroup from '../components/stats-card';

export const getServerSideProps = async () => {
  const userData: any = await getRegisteredUsers();

  const uploadsData: any = await getNumberOfUserUploads();

  return {
    props: {
      userData,
      uploadsData,
    },
  };
};

const Index = ({ userData, uploadsData }: { userData: any; uploadsData: any }) => {
  const store = useStore();
  const [text, setText] = useState('knee');

  function greetByTime(): string {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
      return 'Good morning!';
    }
    if (hour >= 12 && hour < 18) {
      return 'Good Afternoon!';
    }
    return 'Good Evening!';
  }

  useEffect(() => {
    supabaseClient.auth.getSession().then((session) => {
      if (
        session.data.session !== null &&
        session.data.session.user.aud === 'authenticated' &&
        session.data.session != null
      ) {
        store.updateAuthDone(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('access_token', session.data.session.access_token);
        localStorage.setItem('refresh_token', session.data.session.refresh_token);
        if (session.data.session.user.email !== undefined) {
          localStorage.setItem('name', session.data.session.user.email);
        }
        localStorage.setItem('session', JSON.stringify(session.data.session));
      } else {
        store.updateAuthDone(false);
        localStorage.setItem('isAuthenticated', 'false');
      }
    });
    store.updateAuthDone(true);
  }, []);

  useEffect(() => {
    const textArray = ['shoulder', 'ankle', 'knee'];
    let index = 0;

    const intervalId = setInterval(() => {
      setText(textArray[index]);

      index += 1;
      if (index === textArray.length) {
        index = 0;
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container fluid>
      <Image
        src="/static/UNICORN_Logo.jpg"
        alt="Logo"
        width={100}
        height={100}
        radius={20}
        mx="auto"
      />
      <Text fw={700} fz={32} mb="lg" align="center">
        {greetByTime()}
      </Text>
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        We detect {text} implants
      </h1>
      <EmailBanner imageURL="/static/home-page/dr-vineet-batta.jpg" text="Dr. Vineet Batta" />
      <StatsGroup
        statistics={[
          {
            title: 'Users',
            stats: userData,
            description: 'Total registed users',
          },
          {
            title: 'Total Uploads',
            stats: uploadsData,
            description: 'Total Predictions made',
          },
        ]}
      />
    </Container>
  );
};

export default Index;
