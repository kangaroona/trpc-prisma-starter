import Head from 'next/head';
import { ReactNode, useInsertionEffect } from 'react';

type DefaultLayoutProps = { children: ReactNode };
const spyConfig = { title: 'tprcnext' };
export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  useInsertionEffect(() => {
    const script = document.createElement('script');
    const script1 = document.createElement('script');
    script.setAttribute(
      'src',
      'http://192.168.1.81:6752/page-spy/index.min.js',
    );
    script.setAttribute('crossOrigin', 'anonymous');
    script.onload = () => {
      script1.innerHTML = 'window.$pageSpy = new PageSpy({"title":"123"});';
      document.body.appendChild(script1);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      script1 && document.body.removeChild(script1);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  );
};
