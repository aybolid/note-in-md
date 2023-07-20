import Aside from './Aside';
import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen h-full w-full flex;">
      <Aside />
      <div className="w-full min-h-full flex-grow flex flex-col">
        <Header />
        <main className="p-4 h-full flex-grow">
          <section className="container max-w-5xl mx-auto">{children}</section>
        </main>
      </div>
    </div>
  );
}
