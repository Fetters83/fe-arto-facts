import { Routes, Route} from "react-router";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import { artCollectionContext } from "./contexts/artCollectionContext";
import { useState } from "react";
import ArtCollections from "./components/ArtCollections";
import ArtWorks from "./components/ArtWorks";
import SingleArtWork from "./components/SingleArtWork";

function App() {

const [artCollection,setArtCollection] = useState()
 
return(
  <>
 <artCollectionContext.Provider value={{artCollection,setArtCollection}}>
 <Nav/>
  <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/collections" element={<ArtWorks/>}></Route>
    <Route path="/collections/:id" element={<SingleArtWork />} />
  </Routes>
 </artCollectionContext.Provider>

  </>
)

  
  
  
}

export default App
