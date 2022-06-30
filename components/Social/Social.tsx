import Link from "next/link";
import Image from "next/image";

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

export default Social;
