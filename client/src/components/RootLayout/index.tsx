import React from 'react';
import Aside from './Aside';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  const [displayMenu, setDisplayMenu] = React.useState(false);
  return (
    <>
      <div className="h-full flex flex-col">
        <Header displayMenu={displayMenu} />
        <main className="flex-grow p-4 pb-16">
          <section className="container max-w-5xl mx-auto h-full">
            <Outlet />
          </section>
        </main>
      </div>
      <Aside displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} />
    </>
  );
}
