import Aside from './Aside';
import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Aside />
      <div className="w-full h-full flex-grow">
        <Header />
        <main className="p-4">
          <section className="container max-w-5xl mx-auto">{children}</section>
        </main>
      </div>
    </>
  );
}
