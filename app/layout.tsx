import { AuthStoreProvider } from '@/utils/providers/auth-provider';
import './globals.css';
import { cookies } from 'next/headers';
import { getAuth } from "@/utils/auth";
import { Toaster } from 'sonner';
import { Footer } from '@/components/shared/footer';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookiesResult = await cookies();
  const userCookie = cookiesResult.get("sessionToken");
  let res;
  if (userCookie) {
    res = await getAuth(userCookie.value);
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
