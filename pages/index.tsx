import { Text, Container } from '@mantine/core';
import { useEffect } from 'react';

function Index() {
  function greetByTime(): string {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
      return 'Good morning researcher!';
    }
    if (hour >= 12 && hour < 18) {
      return 'Good afternoon researcher!';
    }
    return 'Good evening researcher!';
  }

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    const isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));
    if (!isAuthenticated && (access_token === null || refresh_token === null)) {
      const queryString = window.location.hash.substring(1);
      const params = new URLSearchParams(queryString);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      if (accessToken !== null) localStorage.setItem('access_token', accessToken);
      if (refreshToken !== null) localStorage.setItem('refresh_token', refreshToken);
      if (accessToken !== null && refreshToken !== null) {
        localStorage.setItem('isAuthenticated', 'true');
      }
    }
  });

  return (
    <Container fluid>
      <Text fw={700} fz={48} mb="lg">
        {greetByTime()}
      </Text>
      <Text fz={24}>
        Dr Vineet Batta, MBBS, MS(Orth), MRCS, Dip SEM, FRCS (Orth), MD (Biomed Eng. Research) UCL
        works as Senior Clinical Fellow, Orthopaedic & Trauma Surgeon, Luton & Dunstable University
        NHS Hospital Trust, UK, He is the principal investigator for the project “Automatic
        Identification of Orthopaedic Implants Using Image Processing and Artificial Intelligence-
        IMPRO” and is also the founder and CEO of Unicorn Medics Ltd. Dr Vineet has proven interest
        and experience both as an Orthopedic surgeon and also as an avid Researcher. He has numerous
        publications that showcase his research interest and expertise. He has given guest lectures
        across the globe and has secured various grants as a part of his research. Dr Vineet Batta
        continuously works with a social vision both as a doctor and as a researcher and often
        encourages others to take up challenging roles and responsibilities that benefit the society
        at large. People who are willing to collaborate or share their valuable knowledge or require
        any general guidance can always feel free to contact him.
      </Text>
    </Container>
  );
}

export default Index;
