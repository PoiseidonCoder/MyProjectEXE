import { fetchGetAuthentication } from '@/service/auth';
import './globals.css';
import { cookies } from 'next/headers';
import { Toaster } from 'sonner';
import { AuthStoreProvider } from '@/stores/providers/auth-provider';
import { Footer } from '@/components/layout/footer';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookiesResult = await cookies();
  const userCookie = cookiesResult.get("sessionToken");
  let res;
  if (userCookie) {
    res = await fetchGetAuthentication(userCookie.value);
  }
  return (
    <html lang="en">
      <head />
      <body>
        <AuthStoreProvider
          initialToken={userCookie?.value}
          initialLoggedIn={!!userCookie?.value}
          initialUser={res?.payload}
        >
          <main>
            {children}
          </main>
        </AuthStoreProvider>
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
