import { useEffect, useState, KeyboardEvent } from "react";
import Image from "next/image";
import Art from "../../types/art.type";
import { Toaster, toast } from "react-hot-toast";
import type { NextRouter } from "next/router";

const FILE_URL = "https://content.benoit.fage.fr/assets/";

const Modal = ({ modalOpen, setModalOpen, arts, router }: { modalOpen: number; setModalOpen: React.Dispatch<number>; arts: Art[]; router: NextRouter }) => {
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [arrows, setArrows] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const { image, description, images } = arts.find((art) => art.id === modalOpen) || { image: "", description: "" };
    setImage(image);
    setDescription(description);
    setIsOpen(true);
    const arr = images?.length === undefined ? false : images.length > 1;
    setArrows(arr);
  }, [modalOpen, arts]);
  const share = () => {
    const domain = window.location.origin;
    navigator.clipboard.writeText(`${domain}/?id=${modalOpen}`);
    toast.success("Copied to clipboard");
  };
  const RemoveQueryId = () => {
    if (router.query.id) {
      router.push("/");
    }
  };
  const ChangeImages = (dir: number) => {
    const art = arts.find((art) => art.id === modalOpen);
    if (!art) {
      return;
    }
    const index = art.images.indexOf(image);
    if (index === -1) {
      return;
    }
    let newIndex = index + dir;
    if (newIndex < 0) {
      newIndex = art.images.length - 1;
    } else if (newIndex >= art.images.length) {
      newIndex = 0;
    }
    setImage(art.images[newIndex]);
  };
  const EventArrowKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "ArrowLeft") {
      ChangeImages(-1);
    } else if (e.code === "ArrowRight") {
      ChangeImages(1);
    }
  };
  return (
    <>
      <div onKeyDown={EventArrowKey} tabIndex={0} className={`${image === "" ? "hidden" : ""} fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-[#00000060] z-[60] pt-8`}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="relative w-full h-full">
          {arrows && (
            <>
              <div onClick={() => ChangeImages(1)} className="z-[90] hover:bg-slate-200 absolute right-0 mr-5 top-[50%] flex items-center p-2 bg-white rounded-full cursor-pointer">
                <Image src={"/assets/arrow_up.png"} className="rotate-90" width={32} height={32} alt="arrow" />
              </div>
              <div onClick={() => ChangeImages(-1)} className="z-[90] hover:bg-slate-200 absolute top-[50%] left-5 flex items-center p-2 bg-white rounded-full cursor-pointer">
                <Image src={"/assets/arrow_up.png"} className="-rotate-90" width={32} height={32} alt="arrow" />
              </div>
            </>
          )}
          <div
            className="absolute top-0 cursor-pointer right-5"
            onClick={() => {
              setIsOpen(false);
              setModalOpen(-1);
              RemoveQueryId();
            }}>
            <Image src="/assets/cross.svg" width={48} height={48} alt="cross" className="hover:bg-slate-200 z-[70] bg-white px-1 py-1 rounded-md" />
          </div>

          <div className="w-full h-full p-10">
            <div
              className="relative w-full h-full select-none"
              onBlur={() => {
                setIsOpen(false);
                setModalOpen(-1);
                RemoveQueryId();
              }}>
              {!(image === "") && <Image src={`${FILE_URL}${image}`} layout="fill" objectFit="contain" alt={`${image} image`} onContextMenu={(e) => e.preventDefault()} />}
            </div>
          </div>
          <div className="absolute bottom-0 w-full px-5 py-2 text-lg bg-white">
            <div onClick={share} className="absolute flex items-center p-2 cursor-pointer top-1 right-6">
              <Image src="/assets/icons8-partager-128.png" width={24} height={24} alt="share" className="z-[70]" />
            </div>
            <div className="relative flex justify-center w-full h-6 bg-white select-none">
              <div
                onClick={() => {
                  setIsOpen((p) => !p);
                }}
                className="absolute flex items-center p-2 bg-white rounded-full cursor-pointer hover:bg-slate-200 -top-6">
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

export default Modal;
