import Link from "next/link";
import { useState } from "react";

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

export default Cabochons;
