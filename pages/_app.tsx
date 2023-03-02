// This is a React component that serves as the entry point for the Next.js application. It is responsible for setting up the Mantine and Next.js providers, managing the color scheme of the application, and rendering the application shell and layout components.

// The App component receives the Component and pageProps as props. Component refers to the page component that should be rendered for the current route, and pageProps contains the initial props that will be passed to the page component.

// The App component sets up the ColorSchemeProvider, which manages the color scheme of the application. It also sets up the MantineProvider, which provides the Mantine theme to all child components. Additionally, it sets up the NotificationsProvider, which provides the notification system to all child components.

// The AppShell component is a container for the entire application, including the header, footer, and main content. It receives the HeaderMegaMenu component as a prop to render the application header. The Layout component is a wrapper component that adds some spacing and styling to the child components.

// Finally, the App.getInitialProps function is used to retrieve the initial props for the application. It uses the getCookie function from the cookies-next library to retrieve the mantine-color-scheme cookie value, which is used to set the initial color scheme of the application.

import { useState } from 'react';
import '../style/styles.css';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import { MantineProvider, ColorScheme, ColorSchemeProvider, AppShell } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import HeaderMegaMenu from '../components/header';
import Layout from '../components/layout';

const inter = Inter({ subsets: ['latin'] });

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Impro</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <AppShell
              header={<HeaderMegaMenu />}
              style={{
                minHeight: 'auto',
                paddingBottom: '0px',
                paddingTop: '0px',
              }}
            >
              <Layout>
                <main className={inter.className}>
                  <Component {...pageProps} />
                </main>
              </Layout>
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
