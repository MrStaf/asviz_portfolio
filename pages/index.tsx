import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
// import useComponentVisible from "../hooks/useComponentVisible";

import { H1 } from "../components/Headers";
import { Spacer } from "../components/Spacer";

const FILE_URL = "https://content.benoit.fage.fr/assets/";

interface Art {
  id: number;
  sort: number;
  description: string;
  image: string;
  category: number;
}

interface Category {
  id: number;
  sort: number;
  title: string;
  color: string;
  color_light: string;
  wave: string;
}

interface Social {
  id: number;
  sort: number;
  link: string;
  logo: string;
  name: string;
}

interface AboutMe {
  id: number;
  about_me: string;
  background_imag: string;
  social: Social[];
  cv: string;
}

interface Props {
  art: Art[];
  categories: Category[];
  aboutMe: AboutMe[];
  socials: Social[];
}

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
  const [hover, setHover] = useState(false);
  return (
    <li>
      <Link href={link}>
        <a>
          <div
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            style={{ background: hover ? colorLight : color }}
            className={`w-12 h-12 shadow-xl cursor-pointer rounded-xl hover:opacity-80`}></div>
        </a>
      </Link>
    </li>
  );
};

const Home: NextPage<Props> = ({ art, aboutMe, categories, socials }) => {
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    src: "",
    alt: "",
    description: "",
  });
  const about_me = aboutMe[0];

  const Modal = ({ modalOpen, setModalOpen }: { modalOpen: { src: string; alt: string; description: string }; setModalOpen: Function }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { src, alt, description } = modalOpen;
    return (
      <>
        <div className={`${modalOpen.src === "" && "hidden"} fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-[#00000060] z-[60] pt-8`}>
          <div className="relative w-full h-full">
            <div
              className="absolute top-0 cursor-pointer right-5"
              onClick={() => {
                setModalOpen({ src: "", alt: "", description: "" });
              }}>
              <Image src="/assets/cross.svg" width={48} height={48} alt="cross" className="z-[70]" />
            </div>
            <div className="w-full h-full p-10">
              <div
                className="relative w-full h-full select-none"
                onBlur={() => {
                  alert("a");
                  setModalOpen({ src: "", alt: "", description: "" });
                }}>
                {!(modalOpen.src === "") && <Image src={src} layout="fill" objectFit="contain" alt={alt} onContextMenu={(e) => e.preventDefault()} />}
              </div>
            </div>
            <div className="absolute bottom-0 w-full px-5 py-2 text-lg bg-white">
              <div className="relative flex justify-center w-full h-6 bg-white select-none">
                <div
                  onClick={() => {
                    setIsOpen((p) => !p);
                  }}
                  className="absolute flex items-center p-2 bg-white rounded-full cursor-pointer -top-6">
                  {!isOpen ? <Image src={"/assets/arrow_up.png"} width={32} height={32} alt="arrow" /> : <Image src={"/assets/arrow_down.svg"} width={32} height={32} alt="arrow" />}
                </div>
              </div>
              <div className={`${!isOpen && "hidden"}`} dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Card = ({ src, hasTransparentBg = false, alt, description }: { src: string; hasTransparentBg?: boolean; alt: string; description: string }) => {
    const hasSrc = !(src === "" || src === null || src === undefined);

    return (
      <div
        onClick={() =>
          setModalOpen({
            src: hasSrc ? src : "",
            alt: alt,
            description: description,
          })
        }
        className={`flex-1 rounded-md relative ${(hasTransparentBg || !hasSrc) && "bg-white"} ${!hasSrc && "justify-center flex items-center"} aspect-square`}>
        {hasSrc ? (
          <Image src={src} layout="fill" objectFit="contain" alt={alt} className="rounded-md select-none" onContextMenu={(e) => e.preventDefault()} />
        ) : (
          <svg className="w-5 h-5 mr-3 -ml-1 text-dark animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
      </div>
    );
  };
  console.log(categories, FILE_URL);
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
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <section className="relative flex flex-col items-center justify-between h-screen bg-white">
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-12 h-12 mt-2 ml-2 font-bold cursor-pointer select-none rounded-xl hover:bg-slate-200 hover:text-rose-600" onClick={() => setIsDrawerActive((prev) => !prev)}>
            {!isDrawerActive ? <Image src="/assets/burger.svg" width={32} height={32} alt="burger" /> : <Image src="/assets/cross.svg" width={32} height={32} alt="cross" />}
          </div>
          <div className="pt-16 text-7xl font-title">Ambre Fage</div>
          <div className="absolute bottom-0 animate-bounce">
            <Image src={"/assets/arrow_down.svg"} width={48} height={48} alt="arrow" />
          </div>
          <article className="w-full">
            <div className="flex justify-between w-full px-8 mt-8">
              <div className="flex flex-col w-full max-w-lg items-around">
                <h1 className="mb-2 text-3xl uppercase font-title">About me</h1>
                <p className="text-lg font-extralight">{about_me.about_me}</p>
                <ul className="flex justify-around mt-4">
                  {socials?.map(({ link, logo, name, id }: Social) => (
                    <Social key={`social-${id}`} href={link} src={`${FILE_URL}${logo}`} alt={`${name} logo`} />
                  ))}
                </ul>
              </div>
              <div>
                <ul className="fixed z-50 flex flex-col gap-4 p-2 bg-white shadow-xl right-5 rounded-xl">
                  {categories?.map(({ id, color, color_light }: Category) => (
                    <Cabochons key={`cabochons-${id}`} color={color} colorLight={color_light} link={`#section-${id}`} />
                  ))}
                </ul>
              </div>
            </div>
            <Spacer src="/wave/wave-haikei.svg" />
          </article>
        </section>
        {categories?.map(({ id, color, title, wave }: Category) => (
          <section id={`section-${id}`} key={`section-${id}`} style={{ background: color }} className={`relative flex flex-col items-center justify-between h-screen`}>
            <article className="flex flex-col items-center justify-center w-full">
              <h1 className="mt-4 ml-8 text-5xl font-bold text-center font-title">{title}</h1>
              <div className="grid w-full max-w-6xl grid-cols-2 gap-10 mx-10 my-8">
                {art
                  ?.filter((art: Art) => art.category === id)
                  ?.map(({ id, image, description }: Art) => (
                    <Card key={`card-${id}`} src={FILE_URL + image} alt={`image-${id}`} description={description} />
                  ))}
              </div>
            </article>

            <Spacer src={`${FILE_URL}${wave}`} />
          </section>
        ))}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const art: {
    data: {
      data: Art[];
    };
  } = await axios.get(`${process.env.API_URL}/asviz_art`);
  const aboutMe: {
    data: {
      data: AboutMe[];
    };
  } = await axios.get(`${process.env.API_URL}/asviz_infos`);
  const categories: {
    data: {
      data: Category[];
    };
  } = await axios.get(`${process.env.API_URL}/asviz_categories`);
  const socials: {
    data: {
      data: Social[];
    };
  } = await axios.get(`${process.env.API_URL}/asviz_socials`);
  return {
    props: { art: art.data.data, aboutMe: aboutMe.data.data, categories: categories.data.data, socials: socials.data.data },
    // revalidate: 1,
  };
};

export default Home;
