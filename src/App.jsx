import { Routes, Route} from "react-router";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import { artCollectionContext } from "./contexts/artCollectionContext";
import { useState } from "react";
import ArtCollections from "./components/ArtCollections";
import ArtWorks from "./components/ArtWorks";
import SingleArtWork from "./components/SingleArtWork";
import RijksArtWorks from "./components/RijksArtWorks";
import RijksSingleArtPiece from "./components/RijksSingleArtPiece";

function App() {

const [artCollection,setArtCollection] = useState()
 
return(
  <>
 <artCollectionContext.Provider value={{artCollection,setArtCollection}}>
 <Nav/>
  <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/collections/metCollection" element={<ArtWorks/>}></Route>
    <Route path="/collections/:id" element={<SingleArtWork />} />
    <Route path="/collections/rijksCollection" element={<RijksArtWorks />} />
    <Route path="/collections/rijksCollection/:id" element={<RijksSingleArtPiece />} />
  </Routes>
 </artCollectionContext.Provider>

  </>
)

  
  
  
}

export default App
