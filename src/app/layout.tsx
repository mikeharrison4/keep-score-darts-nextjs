import type { Metadata } from 'next';
import StyledComponentsRegistry from './lib/registry';
import Container from './Container';
import Header from './Header';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'KeepScore Darts',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Container>
            <Header session={session} />
            {children}
          </Container>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
