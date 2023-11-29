import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import '../../styles/globals.css';

const title = 'Sketch2Code';
const description = 'Generate boilerplate UI code from your sketches.';

export const metadata = {
  metadataBase: new URL('https://sketch2code.app'),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
