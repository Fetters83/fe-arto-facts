import { Routes, Route} from "react-router";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import { artCollectionContext } from "./contexts/artCollectionContext";
import { useState } from "react";
import ArtCollections from "./components/ArtCollections";

function App() {

const [artCollection,setArtCollection] = useState()
 
return(
  <>
 <artCollectionContext.Provider value={{artCollection,setArtCollection}}>
 <Nav/>
  <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/collections" element={<ArtCollections/>}></Route>
  </Routes>
 </artCollectionContext.Provider>

  </>
)

  
  
  
}

export default App
