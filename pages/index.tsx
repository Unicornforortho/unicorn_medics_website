// This is a React functional component called "Index" that renders the content of the homepage of a website.

// The component uses the Mantine UI library to render a container with some text inside it. The "greetByTime" function determines the time of day and greets the user accordingly. The "useEffect" hook is used to authenticate the user's session and store the session data in local storage. Finally, the component renders some text about the creator of the website and his work in the field of orthopedics and medical research.

import { Text, Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import supabaseClient from '../supabase';
import useStore from '../store/store';
import EmailBanner from '../components/homepage-banner/index';
import getRegisteredUsers from '../helper-functions/get-registered-users';
import getNumberOfUserUploads from '../helper-functions/get-total-predictions';

function Index() {
  const store = useStore();
  const [numberOfUsers, setNumberOfUsers] = useState<number>(-1);
  const [numberOfUserUploads, setNumberOfUserUploads] = useState<number>(-1);
  const [width, setWidth] = useState(0);
  const [text, setText] = useState('Knee');
  const breakpoint = 768;

  function greetByTime(): string {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
      return 'Good morning. Thanks for your Interest in visiting our website!';
    }
    if (hour >= 12 && hour < 18) {
      return 'Good Afternoon. Thanks for your Interest in visiting our website!';
    }
    return 'Good Evening. Thanks for your Interest in visiting our website!';
  }

  async function getAllData() {
    const userData = await getRegisteredUsers();
    setNumberOfUsers(userData);

    const uploadsData = await getNumberOfUserUploads();
    setNumberOfUserUploads(uploadsData);
  }

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

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
    const textArray = ['Shoulder', 'Ankle', 'Knee'];
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
      {width > breakpoint ? (
        <Text fw={700} fz={36} mb="lg" align="center">
          {greetByTime()}
        </Text>
      ) : (
        <Text fw={600} fz={24} mb="lg" align="center">
          {greetByTime().split('.')[0]}!
        </Text>
      )}
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        Detect {text} Implants
      </h1>
      {numberOfUserUploads === -1 ? (
        <h1>Loading...</h1>
      ) : numberOfUserUploads === 0 ? (
        <h1>No Uploads</h1>
      ) : (
        <h1>{numberOfUserUploads} Uploads</h1>
      )}

      {numberOfUsers === -1 ? (
        <h1>Loading...</h1>
      ) : numberOfUsers === 0 ? (
        <h1>No Users</h1>
      ) : (
        <h1>{numberOfUsers} Users</h1>
      )}
      <EmailBanner imageURL="/static/home-page/dr-vineet-batta.jpg" text="Dr. Vineet Batta" />
    </Container>
  );
}

export default Index;
