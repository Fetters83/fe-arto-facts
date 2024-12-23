import { Routes, Route} from "react-router";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import { artCollectionContext } from "./contexts/artCollectionContext";
import { useState } from "react";

import ArtWorks from "./components/MetArtWorks";
import SingleArtWork from "./components/MetSingleArtWork";
import RijksArtWorks from "./components/RijksArtWorks";
import RijksSingleArtPiece from "./components/RijksSingleArtPiece";
import ChicagoArtWorks from "./components/ChicagoArtWorks";
import ChicagoSingleArtPiece from "./components/ChicagoSingleArtPiece";
import CreateExhibition from "./components/CreateExhibition";
import TemporaryExhibitions from "./components/TemporaryExhibitions";
import MetArtWorks from "./components/MetArtWorks";
import MetSingleArtWork from "./components/MetSingleArtWork";

function App() {

const [artCollection,setArtCollection] = useState()
 
return(
  <>
 <artCollectionContext.Provider value={{artCollection,setArtCollection}}>
 <Nav/>
  <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/collections/metCollection" element={<MetArtWorks/>}></Route>
    <Route path="/collections/metCollection/:id" element={<MetSingleArtWork />} />
    <Route path="/collections/rijksCollection" element={<RijksArtWorks />} />
    <Route path="/collections/rijksCollection/:id" element={<RijksSingleArtPiece />} />
    <Route path="/collections/chicagoCollection" element={<ChicagoArtWorks />} />
    <Route path="/collections/chicagoCollection/:id" element={<ChicagoSingleArtPiece />} />
    <Route path="/create-exhibition" element={<CreateExhibition />} />
    <Route path="/exhibitions" element={<TemporaryExhibitions />} />
  </Routes>
 </artCollectionContext.Provider>

  </>
)

  
  
  
}

export default App
