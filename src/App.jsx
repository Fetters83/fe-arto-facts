import { Routes, Route} from "react-router";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import ChicagoArtWorks from "./components/ChicagoArtWorks";
import ChicagoSingleArtPiece from "./components/ChicagoSingleArtPiece";
import TemporaryExhibitions from "./components/TemporaryExhibitions";
import ClevelandArtWorks from "./components/ClevelandArtWorks";
import ClevelandSingleArtWork from "./components/ClevelandComponents/ClevelandSingleArtwork";

function App() {


return(
  <>

 <section className="font-body">
 <Nav/>
  <Routes>
   
    <Route path="/" element={<HomePage/>}></Route> 
    <Route path="/collections/chicagoCollection" element={<ChicagoArtWorks />} />
    <Route path="/collections/chicagoCollection/:id" element={<ChicagoSingleArtPiece />} />
    <Route path="/collections/clevelandCollection" element={<ClevelandArtWorks/>} />
    <Route path="/collections/clevelandCollection/:id" element={<ClevelandSingleArtWork/>} />
    <Route path="/exhibitions" element={<TemporaryExhibitions />} />
  </Routes>
 </section>
  </>
)

  
  
  
}

export default App
