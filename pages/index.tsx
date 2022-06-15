import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { H1 } from "../components/Headers";
import { Spacer } from "../components/Spacer";

const Social = ({ href, src, alt }: { href: string; src: string; alt: string }) => {
  return (
    <li>
      <Link href={href}>
        <a target="_blank" rel="no-refferrer">
          <Image src={src} width={32} height={32} alt={alt} />
        </a>
      </Link>
    </li>
  );
};

const Cabochons = ({ link, color, colorLight }: { link: string; color: string; colorLight: string }) => {
  return (
    <li>
      <Link href={link}>
        <a>
          <div className={`bg-[${color}] hover:bg-[${colorLight}] w-12 h-12 shadow-xl cursor-pointer rounded-xl hover:opacity-80`}></div>
        </a>
      </Link>
    </li>
  );
};

const Home: NextPage = () => {
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  return (
    <>
      <Head>
        <title>Asviz portfolio</title>
        <meta name="description" content="Miss Asviz portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-full bg-red-500">
        <div className={`${isDrawerActive ? "flex w-full" : "hidden"} z-40 fixed flex-col items-center h-full max-w-xs bg-blue-300`}>
          <H1>galerie</H1>
          <H1>cv</H1>
          <H1>
            contact pro
            <br />&<br /> commission
          </H1>
          <div className="w-64 mt-16 h-96 bg-slate-400" style={{ clipPath: " ellipse(40% 50% at 50% 50%)" }}></div>
        </div>
        <section className="relative flex flex-col items-center justify-between h-screen bg-white">
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-12 h-12 font-bold cursor-pointer select-none hover:bg-slate-200 hover:text-rose-600" onClick={() => setIsDrawerActive((prev) => !prev)}>
            {!isDrawerActive ? <Image src="/assets/burger.svg" width={32} height={32} alt="burger" /> : <Image src="/assets/cross.svg" width={32} height={32} alt="burger" />}
          </div>
          <div className="pt-16 text-5xl font-semibold">Ambre Fage</div>
          <div className="absolute bottom-0 animate-bounce">
            <Image src={"/assets/arrow_down.svg"} width={48} height={48} alt="cv" />
          </div>
          <article className="w-full">
            <div className="flex justify-between w-full px-8 mt-8">
              <div className="flex flex-col items-center w-full max-w-lg">
                <h1 className="text-3xl uppercase">About me</h1>
                <p className="text-lg">
                  Nisi dolore non cillum aliquip velit do enim cillum nostrud labore pariatur anim reprehenderit nulla. Deserunt laborum excepteur dolore in aliquip mollit commodo consequat et anim nostrud. Ipsum aliqua in in laboris. Consectetur dolore
                  dolor sit irure tempor consectetur dolore. Ipsum sunt in eiusmod exercitation ea magna sunt minim voluptate nostrud ad dolore aliquip. Id elit nostrud consequat ipsum velit ex qui mollit excepteur incididunt deserunt irure. Ea ex
                  occaecat sunt esse amet sit. Incididunt officia ut commodo nulla qui magna. Aliquip in officia commodo quis cupidatat sit nulla ea.
                </p>
                <ul className="flex gap-4 mt-4">
                  <Social href="eaxmple.com" src="/assets/icons8-twitter.svg" alt="twitter logo" />
                  <Social href="eaxmple.com" src="/assets/icons8-facebook-circled.svg" alt="facebook logo" />
                  <Social href="eaxmple.com" src="/assets/icons8-instagram-128.svg" alt="instagram logo" />
                  <Social href="eaxmple.com" src="/assets/icons8-price-tag-64.png" alt="fiverr link" />
                </ul>
              </div>
              <div>
                <ul className="flex flex-col gap-4">
                  <Cabochons link="#section-1" color="#ff7799" colorLight="#ffa4bb" />
                  <Cabochons link="#section-2" color="#9e7fff" colorLight="#c9b7ff" />
                  <Cabochons link="#section-3" color="#6ebaff" colorLight="#a1d1ff" />
                  <Cabochons link="#section-4" color="#ffc044" colorLight="#ffd589" />
                </ul>
              </div>
            </div>
            <Spacer src="/wave/wave-haikei.svg" />
          </article>
        </section>
        <section id="section-1" className="flex flex-col justify-between h-screen bg-[#ff7799]">
          <article></article>
          <Spacer src="/wave/layered-waves-haikei-2.svg" />
        </section>
        <section id="section-2" className="flex flex-col justify-between h-screen bg-[#9e7fff]">
          <article></article>
          <Spacer src="/wave/stacked-waves-haikei.svg" />
        </section>
        <section id="section-3" className="flex flex-col justify-between h-screen bg-[#6ebaff]">
          <article></article>
          <Spacer src="/wave/stacked-waves-haikei (1).svg" />
        </section>
        <section id="section-4" className="flex flex-col justify-between h-screen bg-[#ffc044]"></section>
      </main>
    </>
  );
};

export default Home;
