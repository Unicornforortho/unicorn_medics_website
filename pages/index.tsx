// This is a React functional component called "Index" that renders the content of the homepage of a website.

// The component uses the Mantine UI library to render a container with some text inside it. The "greetByTime" function determines the time of day and greets the user accordingly. The "useEffect" hook is used to authenticate the user's session and store the session data in local storage. Finally, the component renders some text about the creator of the website and his work in the field of orthopedics and medical research.

import { Text, Container } from '@mantine/core';
import { useEffect } from 'react';
import supabaseClient from '../supabase';
import useStore from '../store/store';

function Index() {
  const store = useStore();

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

  useEffect(() => {
    supabaseClient.auth.getSession().then((session) => {
      if (
        session.data.session !== null &&
        session.data.session.user.aud === 'authenticated' &&
        session.data.session != null
      ) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('access_token', session.data.session.access_token);
        localStorage.setItem('refresh_token', session.data.session.refresh_token);
        if (session.data.session.user.email !== undefined) {
          localStorage.setItem('name', session.data.session.user.email);
        }
        localStorage.setItem('session', JSON.stringify(session.data.session));
      } else {
        localStorage.setItem('isAuthenticated', 'false');
      }
    });
    store.updateAuthDone(true);
  }, []);

  return (
    <Container fluid>
      <Text fw={700} fz={36} mb="lg" align="center">
        {greetByTime()}
      </Text>
      <Text fz={18} align="justify">
        Dr Vineet Batta, MBBS, MS(Orth), MRCS, Dip SEM, FRCS (Orth), MD (Biomed Eng. Research)UCL ,
        works as Senior Clinical Fellow, Orthopaedic & Trauma Surgeon, Luton & Dunstable University
        NHS Hospital Trust, United Kingdom.
      </Text>
      <br />
      <Text fz={18} align="justify">
        He is the principal investigator for the project “Automatic Identification of Orthopaedic
        Implants Using Image Processing and Artificial Intelligence- IMPRO” and is also the founder
        and CEO of Unicorn Medics Ltd.
      </Text>
      <br />
      <Text fz={18} align="justify">
        Dr Vineet has proven interest and experience both as an Orthopedic surgeon and also as an
        avid Researcher. He has numerous publications that showcase his research interest and
        expertise.
      </Text>
      <br />
      <Text fz={18} align="justify">
        He has given guest lectures across the globe and has secured various grants as a part of his
        research. Dr Vineet Batta continuously works with a social vision both as a doctor and as a
        researcher and often encourages others to take up challenging roles and responsibilities
        that benefit the society at large. People who are willing to collaborate or share their
        valuable knowledge or require any general guidance can always feel free to contact him.
      </Text>
    </Container>
  );
}

export default Index;
