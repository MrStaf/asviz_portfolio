import Image from "next/image";
import React from "react";
import { useState } from "react";

const Card = ({ images, src, hasTransparentBg, alt, id, setModalOpen }: { images: string[]; src: string; hasTransparentBg?: boolean; alt: string; id: number; setModalOpen: React.Dispatch<React.SetStateAction<number>> }) => {
  const hasSrc = false;
  const [isLoading, setIsLoading] = useState(true);
  const OpenId = () => {
    setModalOpen(id);
  };
  const len = images.length;
  return (
    <div onClick={OpenId} className={`flex-1 cursor-pointer rounded-md relative ${isLoading ? "animated-loading-card" : ""} ${!hasSrc ? "justify-center flex items-center" : ""} aspect-square`}>
      <div className="z-[59] text-white absolute top-1 right-1 px-2 rounded-md bg-black bg-opacity-50">{len !== 1 ? `1 / ${len}` : ""}</div>
      {/* {hasSrc ? ( */}
      <Image
        onLoad={() => {
          setIsLoading(false);
        }}
        src={src}
        layout="fill"
        objectFit="contain"
        priority
        alt={alt}
        className="w-full h-full rounded-md select-none"
        onContextMenu={(e) => e.preventDefault()}
      />
      {/* // ) : (
      //   <svg className="w-5 h-5 mr-3 -ml-1 text-dark animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      //     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      //     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      //   </svg>
      // )} */}
    </div>
  );
};

export default Card;
