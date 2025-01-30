import { Routes, Route} from "react-router";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import { artCollectionContext } from "./contexts/artCollectionContext";
import { useState } from "react";

import ArtWorks from "./components/MetArtWorks";
import SingleArtWork from "./components/MetSingleArtWork";

import ChicagoArtWorks from "./components/ChicagoArtWorks";
import ChicagoSingleArtPiece from "./components/ChicagoSingleArtPiece";
import CreateExhibition from "./components/CreateExhibition";
import TemporaryExhibitions from "./components/TemporaryExhibitions";
import MetArtWorks from "./components/MetArtWorks";
import MetSingleArtWork from "./components/MetSingleArtWork";
import Test from "./components/test";
import MetArtWorks2 from "./components/MetArtWorks2";
import ClevelandArtWorks from "./components/ClevelandArtWorks";
import ClevelandSingleArtWork from "./components/ClevelandComponents/ClevelandSingleArtwork";

function App() {

const [artCollection,setArtCollection] = useState()
 
return(
  <>
{/*  <artCollectionContext.Provider value={{artCollection,setArtCollection}}> */}
 <section className="font-body">
 <Nav/>
  <Routes>
   
   {/*  <Route path="/" element={<HomePage/>}></Route> */}
   <Route path="/" element={<Test/>}></Route>
    <Route path="/collections/metCollection" element={<MetArtWorks2/>}></Route>
    <Route path="/collections/metCollection/:id" element={<MetSingleArtWork />} />
     <Route path="/collections/chicagoCollection" element={<ChicagoArtWorks />} />
    <Route path="/collections/chicagoCollection/:id" element={<ChicagoSingleArtPiece />} />
    <Route path="/collections/clevelandCollection" element={<ClevelandArtWorks/>} />
    <Route path="/collections/clevelandCollection/:id" element={<ClevelandSingleArtWork/>} />
    <Route path="/create-exhibition" element={<CreateExhibition />} />
    <Route path="/exhibitions" element={<TemporaryExhibitions />} />
  </Routes>
 </section>

 
{/*  </artCollectionContext.Provider> */}

  </>
)

  
  
  
}

export default App
