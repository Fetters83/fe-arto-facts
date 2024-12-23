import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState} from 'react'
import MobileMenu from "./MobileMenu";
import ExploreArtworksDDDT from "./ExploreArtworksDDDT";


const Nav = () => {

    const [mobileMenuClicked,setMobileMenuClicked] = useState(false)
  

    useEffect(()=>{

    },[mobileMenuClicked])

    const handleClick= ()=>{
        setMobileMenuClicked(true)
    }


    return (
        <section className="bg-blue-200">
  <section className="flex items-center justify-between p-10 lg:flex-row">
            <section className="border-r-4 border-white">
                <a href="#" className="text-black font-mono text-3xl tracking-wider flex items-center p-4">ARTO-FACTS</a>
            </section>
            <section className="ssm:block-x-s lg:hidden">
                             <RxHamburgerMenu className="text-4xl" onClick={handleClick}/>
            </section>
            {mobileMenuClicked && <MobileMenu setMobileMenuClicked={setMobileMenuClicked}/>}
            <section className="ssm:hidden lg:block space-x-6 text-1xl">
                <a href="#" className="text-black font-normal hover:font-bold">Home</a>
                <ExploreArtworksDDDT />         
                <a href="#" className="text-black font-normal hover:font-bold">My Exhibitions</a>
                <a href="#" className="text-black font-normal hover:font-bold">Subscribed Exhibitions</a>
                <a href="#" className="text-black font-normal hover:font-bold">Login</a>
                <a href="#" className="text-black font-normal hover:font-bold">Sign Up</a>
             
            </section>
        </section>
        </section>
      
    );
};

export default Nav;
