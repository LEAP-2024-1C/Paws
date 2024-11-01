import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { PetsProvider } from '@/components/context/pets-context';
import { ProfileProvider } from '@/components/context/profile_context';
import { ShoppingProvider } from '@/components/context/shopping_context';
import { UserProvider } from '@/components/context/user_context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <UserProvider>
          <ShoppingProvider>
            <ProfileProvider>
              <PetsProvider>
                <NextTopLoader showSpinner={false} />
                <Toaster />
                {children}
              </PetsProvider>
            </ProfileProvider>
          </ShoppingProvider>
        </UserProvider>
      </body>
    </html>
  );
}
