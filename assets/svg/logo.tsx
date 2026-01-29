// React Imports
import Image from "next/image";
import logo from "../../public/image (3).jpg";

const Logo = () => {
  return (
    <Image src={logo} loading="lazy" alt="logo" width={50} className="rounded-full"/>
  );
};

export default Logo;
