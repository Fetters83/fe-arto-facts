import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import ExploreArtworksDDDT from "./ExploreArtworksDDDT";

const Nav = () => {
  const [mobileMenuClicked, setMobileMenuClicked] = useState(false);

  const handleClick = () => {
    setMobileMenuClicked(true);
  };

  return (
    <section className="bg-blue-200">
      <section className="flex items-center justify-between p-10 lg:flex-row">
        <section className="border-r-4 border-white">
          <a href="#" className="text-black font-mono text-3xl tracking-wider flex items-center p-4">ARTO-FACTS</a>
        </section>
        <section className="ssm:block-x-s lg:hidden">
          <RxHamburgerMenu className="text-4xl" onClick={handleClick} />
        </section>
        {mobileMenuClicked && <MobileMenu setMobileMenuClicked={setMobileMenuClicked} />}
        <section className="ssm:hidden lg:block space-x-6 text-1xl">
          <a href="/" className="text-black font-normal hover:font-bold">Home</a>
          <ExploreArtworksDDDT />
          <a href="/create-exhibition" className="text-black font-normal hover:font-bold">Create Exhibition</a>
          <a href="/exhibitions" className="text-black font-normal hover:font-bold">Temporary Exhibitions</a>
        </section>
      </section>
    </section>
  );
};

export default Nav;
