import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import '../../styles/globals.css';

const title = 'Sketch2App';
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
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
