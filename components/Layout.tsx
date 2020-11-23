import Head from "next/head"
import Image from 'next/image'
import React, { FunctionComponent } from "react"

interface LayoutProps {
  title: string
}


const Layout: FunctionComponent<LayoutProps> = ({ children, title }) => (
  <div className="flex flex-col justify-between box-border antialiased text-gray-900 bg-white max-h-screen">
    <Head>
      <title>{title} | die schönen Seiten des Wedding</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="px-5 py-4 shadow-sm"
    >
      <Image
        src="/assets/logo_black.png"
        alt="die schönen Seiten des Wedding"
        width={80}
        height={37}
      ></Image>
    </header>
    <main className="flex min-h-full">
      {children}
    </main>
  </div>
)

export default Layout