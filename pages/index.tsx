// Modules
import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// Components
import { Social as SocialComp } from "../components/Social";
import { H1 } from "../components/Headers";
import { Spacer } from "../components/Spacer";
import { Cabochons } from "../components/Cabochons";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";

// Types
import Art from "../types/art.type";
import Category from "../types/category.type";
import Social from "../types/social.type";
import AboutMe from "../types/about_me.type";
import Props from "../types/props.type";

const FILE_URL = "https://content.benoit.fage.fr/assets/";

const Home: NextPage<Props> = ({ art, aboutMe, categories, socials }) => {
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(-1);
  const about_me = aboutMe[0];
  // get the query id with next router
  const router = useRouter();
  useEffect(() => {
    const id = "" + router.query.id;
    const artId = id ? parseInt(id) : -1;
    setModalOpen(artId);
  }, [router]);

  return (
    <>
      <Head>
        <title>Asviz portfolio</title>
        <meta name="description" content="Miss Asviz portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-full bg-white font-body">
        <div className={`${isDrawerActive ? "flex w-full" : "hidden"} z-40 fixed flex-col items-center h-full max-w-xs bg-slate-50 shadow-stone-600 shadow-xl`}>
          <H1>
            <Link href={!about_me?.cv ? "a" : about_me.cv}>
              <a>cv</a>
            </Link>
          </H1>
          <H1>
            <Link href={!about_me?.contact_pro ? "a" : about_me.contact_pro}>
              <a>
                contact pro
                <br />&
                <br /> commission
              </a>
            </Link>
          </H1>
          <div className="relative w-11/12 mt-16">{about_me.drawer_image && <Image objectFit="contain" layout="responsive" width="100%" height="100%" src={FILE_URL + about_me.drawer_image} alt="background image" />}</div>
        </div>
        <Modal router={router} modalOpen={modalOpen} setModalOpen={setModalOpen} arts={art} />
        <section
          style={{ backgroundImage: `url('${FILE_URL + about_me.background_image}')`, backgroundPosition: "center", backgroundRepeat: "none" }}
          className={`cover relative flex flex-col items-center justify-between h-screen ${about_me.light ? "text-black" : "text-white"}`}>
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
                <div className="text-lg font-extralight" dangerouslySetInnerHTML={{ __html: about_me.about_me }}></div>
                <ul className="flex justify-around mt-4">
                  {socials?.map(({ link, logo, name, id }: Social) => (
                    <SocialComp key={`social-${id}`} href={link} src={`${FILE_URL}${logo}`} alt={`${name} logo`} />
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
          <section id={`section-${id}`} key={`section-${id}`} style={{ background: color }} className={`relative flex flex-col items-center justify-between min-h-screen`}>
            <article className="flex flex-col items-center justify-center w-full">
              <h1 className="mt-4 ml-8 text-5xl font-bold text-center font-title">{title}</h1>
              <div className="grid w-full max-w-6xl grid-cols-1 gap-10 px-4 mt-8 sm:px-10 sm:grid-cols-2">
                {art
                  ?.filter((art: Art) => art.category === id)
                  ?.map(({ id, image }: Art) => (
                    <Card router={router} id={id} key={`card-${id}`} src={`${FILE_URL}${image}`} alt={`image-${id}`} setModalOpen={setModalOpen} />
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
    revalidate: 20,
  };
};

export default Home;
