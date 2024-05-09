import type { Metadata } from 'next';
import { Nunito_Sans as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import Header from '@/components/layouts/Header';
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Rakamin Mini Project',
  description:
    'System that can be used to organize tasks with the Kanban Board.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Toaster position="top-center" expand={false} richColors />
        <Header />
        {children}
      </body>
    </html>
  );
}
