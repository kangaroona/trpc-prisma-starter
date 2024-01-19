import Head from 'next/head';
import { ReactNode, useInsertionEffect } from 'react';

type DefaultLayoutProps = { children: ReactNode };
const spyConfig = { title: 'tprcnext' };
export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  useInsertionEffect(() => {
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      'http://192.168.1.81:6752/page-spy/index.min.js',
    );
    script.setAttribute('crossOrigin', 'anonymous');
    document.body.appendChild(script);
    const script1 = document.createElement('script');
    script1.innerHTML = 'window.$pageSpy = new PageSpy({"name":"123"});';
    document.body.appendChild(script1);
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script1);
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
