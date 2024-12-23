import { IoIosCloseCircleOutline } from "react-icons/io";


const MobileMenu = ({ setMobileMenuClicked }) => {
    const handleClick = () => {
      setMobileMenuClicked(false);
    };
  
    return (
      <section
        className="bg-blue-100 shadow-lg p-6 fixed bottom-0 left-0 w-full h-[70vh] 
                   transform translate-y-0 transition-transform duration-2000 ease-in border-t-4 border-blue-100"
      >
        {/* Close Button */}
        <section>
          <button onClick={handleClick} className="text-black text-lg font-bold">
          <IoIosCloseCircleOutline className="text-4xl" />
          </button>
        </section>
  
        {/* Menu Links */}
        <section className="flex flex-col items-left justify-center space-y-4 mt-10">
          <a href="#" className="text-black font-normal hover:font-bold">
            Home
          </a>
          <a href="#" className="text-black font-normal hover:font-bold">
            Explore Artworks
          </a>
          <a href="#" className="text-black font-normal hover:font-bold">
            My Exhibitions
          </a>
          <a href="#" className="text-black font-normal hover:font-bold">
            Login
          </a>
          <a href="#" className="text-black font-normal hover:font-bold">
            Sign Up
          </a>
        </section>
      </section>
    );
  };
  
  export default MobileMenu;
  