import Head from "next/head"
import Image from 'next/image'
import React, { FunctionComponent } from "react"

interface LayoutProps {
  title: string
}


const Layout: FunctionComponent<LayoutProps> = ({ children, title }) => (
  <div className="flex flex-col justify-between box-border antialiased text-gray-900 bg-white min-h-screen">
    <Head>
      <title>{title} | die schönen Seiten des Wedding</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="px-5 py-4 shadow-sm"
    >
      <Image
        src="/assets/logo_black.png"
        alt="die schönen Seiten des Wedding"
        width={400 / 3}
        height={186 / 3}
      ></Image>
    </header>
    <main className="flex min-h-full">
      {children}
    </main>
    <footer className="h-10 flex justify-center items-center text-sm uppercase tracking-tight font-medium">
      <a className="px-2 py-2" href="http://" target="_blank" rel="noopener noreferrer">hauptseite</a> | <a className="px-2 py-2" href="http://" target="_blank" rel="noopener noreferrer">impressum</a>
    </footer>
  </div>
)

export default Layout