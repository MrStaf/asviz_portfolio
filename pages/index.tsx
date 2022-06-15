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

const Card = ({ src, hasTransparentBg = false, alt }: { src: string; hasTransparentBg: boolean; alt: string }) => {
  const hasSrc = !(src === "" || src === null || src === undefined);

  return (
    <div className={`flex-1 rounded-md relative ${(hasTransparentBg || !hasSrc) && "bg-white"} ${!hasSrc && "justify-center flex items-center"} aspect-square`}>
      {hasSrc ? (
        <Image src={src} layout="fill" objectFit="contain" alt={alt} className="rounded-md" />
      ) : (
        <svg className="w-5 h-5 mr-3 -ml-1 text-dark animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
    </div>
  );
};

const Modal = () => {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-[#00000060] z-[60] pt-8">
        <div className="relative w-full h-full">
          <div className="absolute cursor-pointer top-5 right-5">
            <Image src="/assets/cross.svg" width={32} height={32} alt="cross" className="z-[70]" />
          </div>
          <div className="relative w-full h-full p-8">
            <Image src="/arts/LogoKasar.png" layout="fill" objectFit="contain" alt="modal" />
          </div>
          <div className="absolute bottom-0 px-5 py-2 text-lg -translate-x-full bg-white">
            <p>
              Ex consectetur magna fugiat duis duis quis labore dolor id. Incididunt ullamco mollit nisi labore sint velit. Aliquip adipisicing incididunt quis dolore labore nisi do et ipsum. Aliqua esse nostrud cillum nulla commodo eiusmod et commodo in
              magna labore sit Lorem. Cupidatat qui ex consectetur non officia fugiat. Ad laborum qui consequat proident do enim adipisicing minim. Sunt laborum dolor quis veniam proident laboris aute do eu. Nisi fugiat enim officia nostrud sint. Eiusmod
              enim quis irure dolor cillum et est cupidatat et quis et dolor est. Sunt id consequat tempor pariatur nostrud esse ad. Culpa tempor eiusmod et qui magna quis laboris elit. Voluptate commodo consequat minim pariatur eiusmod. Magna ut culpa
              minim aute labore nulla mollit magna do ullamco. Exercitation irure esse proident mollit cillum cupidatat.
            </p>
          </div>
        </div>
      </div>
    </>
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
      <main className="relative h-full bg-red-500 font-body">
        <div className={`${isDrawerActive ? "flex w-full" : "hidden"} z-40 fixed flex-col items-center h-full max-w-xs bg-slate-50 shadow-stone-600 shadow-xl`}>
          <H1>galerie</H1>
          <H1>cv</H1>
          <H1>
            contact pro
            <br />&<br /> commission
          </H1>
          <div className="w-64 mt-16 h-96 bg-slate-400" style={{ clipPath: " ellipse(40% 50% at 50% 50%)" }}></div>
        </div>
        <Modal />
        <section className="relative flex flex-col items-center justify-between h-screen bg-white">
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-12 h-12 mt-2 ml-2 font-bold cursor-pointer select-none rounded-xl hover:bg-slate-200 hover:text-rose-600" onClick={() => setIsDrawerActive((prev) => !prev)}>
            {!isDrawerActive ? <Image src="/assets/burger.svg" width={32} height={32} alt="burger" /> : <Image src="/assets/cross.svg" width={32} height={32} alt="cross" />}
          </div>
          <div className="pt-16 text-7xl font-title">Ambre Fage</div>
          <div className="absolute bottom-0 animate-bounce">
            <Image src={"/assets/arrow_down.svg"} width={48} height={48} alt="cv" />
          </div>
          <article className="w-full">
            <div className="flex justify-between w-full px-8 mt-8">
              <div className="flex flex-col w-full max-w-lg items-around">
                <h1 className="mb-2 text-3xl uppercase font-title">About me</h1>
                <p className="text-lg font-extralight">
                  Nisi dolore non cillum aliquip velit do enim cillum nostrud labore pariatur anim reprehenderit nulla. Deserunt laborum excepteur dolore in aliquip mollit commodo consequat et anim nostrud. Ipsum aliqua in in laboris. Consectetur dolore
                  dolor sit irure tempor consectetur dolore. Ipsum sunt in eiusmod exercitation ea magna sunt minim voluptate nostrud ad dolore aliquip. Id elit nostrud consequat ipsum velit ex qui mollit excepteur incididunt deserunt irure. Ea ex
                  occaecat sunt esse amet sit. Incididunt officia ut commodo nulla qui magna. Aliquip in officia commodo quis cupidatat sit nulla ea.
                </p>
                <ul className="flex justify-around mt-4">
                  <Social href="eaxmple.com" src="/assets/icons8-twitter.svg" alt="twitter logo" />
                  <Social href="eaxmple.com" src="/assets/icons8-facebook-circled.svg" alt="facebook logo" />
                  <Social href="eaxmple.com" src="/assets/icons8-instagram-128.svg" alt="instagram logo" />
                  <Social href="eaxmple.com" src="/assets/icons8-price-tag-64.png" alt="fiverr link" />
                </ul>
              </div>
              <div>
                <ul className="fixed z-50 flex flex-col gap-4 p-2 bg-white shadow-xl right-5 rounded-xl">
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
        <section id="section-1" className="flex flex-col justify-between bg-[#ff7799]">
          <article className="flex flex-col items-center justify-center w-full">
            <h1 className="mt-4 ml-8 text-5xl font-bold text-center font-title">Digital Art</h1>
            <div className="grid w-full max-w-6xl grid-cols-2 gap-10 mx-10 my-8">
              <Card src="/arts/Couv_Boutia.png" alt="some art" />
              <Card src="/arts/LogoKasar.png" alt="some art" hasTransparentBg={true} />
              <Card src="/arts/Mage_Final.JPG" alt="some art" />
              <Card src="/arts/Messecure_2.PNG" alt="some art" hasTransparentBg={true} />
              <Card src="/arts/Protect_Earth.png" alt="some art" />
              <Card src="/arts/Reveuse.PNG" alt="some art" />
              <Card src="/arts/Roi_Dechu.PNG" alt="some art" />
              <Card src="/arts/Valeria_Portrait.PNG" alt="some art" />
            </div>
          </article>
          <Spacer src="/wave/layered-waves-haikei-2.svg" />
        </section>
        <section id="section-2" className="flex flex-col justify-between bg-[#9e7fff]">
          <article className="flex flex-col items-center justify-center w-full">
            <h1 className="mt-4 ml-8 text-5xl font-bold text-center font-title">Digital Art</h1>
            <div className="grid w-full max-w-6xl grid-cols-2 gap-10 mx-10 my-8">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </article>
          <Spacer src="/wave/stacked-waves-haikei.svg" />
        </section>
        <section id="section-3" className="flex flex-col justify-between bg-[#6ebaff]">
          <article className="flex flex-col items-center justify-center w-full">
            <h1 className="mt-4 ml-8 text-5xl font-bold text-center font-title">Digital Art</h1>
            <div className="grid w-full max-w-6xl grid-cols-2 gap-10 mx-10 my-8">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </article>
          <Spacer src="/wave/stacked-waves-haikei (1).svg" />
        </section>
        <section id="section-4" className="flex flex-col justify-between bg-[#ffc044]">
          <article className="flex flex-col items-center justify-center w-full">
            <h1 className="mt-4 ml-8 text-5xl font-bold text-center font-title">Digital Art</h1>
            <div className="grid w-full max-w-6xl grid-cols-2 gap-10 mx-10 my-8">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;
