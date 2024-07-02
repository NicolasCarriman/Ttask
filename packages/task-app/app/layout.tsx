import './style/global.scss';
import { Providers } from './providers';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
 
const monserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <head>
        <meta charSet="UTF-8"/>
        <link rel='icon' href='./favicon.ico'/>
        <title>T-Task</title>
      </head>
      <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.locations}&loading=async&libraries=places&callback=initMap`}></Script>
      <body className={monserrat.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
