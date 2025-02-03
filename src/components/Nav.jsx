import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import ExploreArtworksDDDT from "./ExploreArtworksDDDT";
import { Link } from "react-router-dom";

const Nav = () => {
  const [mobileMenuClicked, setMobileMenuClicked] = useState(false);

  const handleClick = () => {
    setMobileMenuClicked(true);
  };

  return (
    <section className="bg-blue-200">
      <section className="flex items-center justify-between p-10 lg:flex-row">
        <section className="border-r-4 border-white">
          <a className="text-black font-mono text-3xl tracking-wider flex items-center p-4">ARTO-FACTS</a>
        </section>
        <section className="ssm:block-x-s lg:hidden">
          <RxHamburgerMenu className="text-4xl" onClick={handleClick} />
        </section>
        {mobileMenuClicked && <MobileMenu setMobileMenuClicked={setMobileMenuClicked} />}
        <section className="ssm:hidden lg:block space-x-6 text-1xl">
          <Link to={'/'}className="text-black font-normal hover:font-bold">Home</Link>
          <ExploreArtworksDDDT />
          <Link to={'/exhibitions'} className="text-black font-normal hover:font-bold" >Temporary Exhibitions</Link>
        </section>
      </section>
    </section>
  );
};

export default Nav;
