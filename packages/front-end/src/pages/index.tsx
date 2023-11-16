import clsx from 'clsx';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // if SESSION_TOKEN is set, then hit our back-end to check authentication
  // status. if the token is valid, then we'll get back the user's info and pass
  // it to the HomeProps object.

  const { headers } = ctx.req;
  if (headers?.cookie) {
    const cookie = headers?.cookie;
    const sessionToken = cookie.split('=')[1];

    const getUser = async () => {
      try {
        const { data } = await axios.get('http://10.0.0.27:50000/auth/', {
          headers: {
            Cookies: sessionToken,
          },
        });

        const sessionId = data.data.session.id;
        const username = data.data.user.username;
        const displayName = data.data.user.displayName;

        if (data.data && data.data.user && data.data.user.displayName) {
          return {
            props: {
              sess: {
                id: sessionId,
                username: username,
                displayName: displayName,
              },
            },
          };
        }
      } catch (err) {
        console.error(err);
        return {
          props: {},
        };
      }
    };

    return getUser();
  } else {
    // Cookie not present, we're not logged in!
    if (process.env.NODE_ENV !== 'production') {
      console.debug('Cookie not present, refusing to check auth status!');
    }
  }

  return {
    props: {},
  };
}

export type HomeProps = {
  sess?: {
    id: number;
    username: string;
    displayName: string;
  };
};
export default function Home({ sess }: HomeProps) {
  return (
    <>
      <Head>
        <title>Atllas Takehome</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <main className={clsx('w-full h-full', inter.className)}>
        <h1 className="border-b border-neutral-300 px-4 py-2 text-2xl font-medium text-center">
          User Profile
        </h1>
        <div className="p-4">
          <p className="text-neutral-500">{`How ya goin, ${
            sess?.displayName || sess?.username || 'stranger'
          }?`}</p>
        </div>
      </main>
    </>
  );
}
