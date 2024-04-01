import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import '../styles/globals.css';

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
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
          {children}
          <Footer />
        </div>
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{ duration: 10000 }}
        />
        <Analytics />
      </body>
    </html>
  );
}
