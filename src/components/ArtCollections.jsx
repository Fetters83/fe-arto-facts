import { useContext,useEffect, useState } from "react";
import fetchMetArtWork from "../../api";
import { artCollectionContext } from '../contexts/artCollectionContext';

const ArtCollections = () => {
  const [artArray, setArtArray] = useState([]);
  const [loading, setloading] = useState(true);
  const {artCollection} = useContext(artCollectionContext)
  let data = [];


  useEffect(() => {
    if (!artCollection) return; 
    const getArtWork = async () => {
      if(artCollection==='metCollection'){
         data = await fetchMetArtWork();
      }  
     
      setArtArray(data);
      setloading(false);
    };
    getArtWork();
  }, [artCollection]);

  return (
    !loading && (
      <section className="font-body">
        <section className="grid m-4">
          <section className="grid cols 1">
            {artArray.map((art) => {
              console.log(art);
              return (
                <ul className="bg-white rounded overflow-hidden shadow m-4 p-4 border solid border-grey:1000">
                  <li>
                    <img
                      src={art.smallImg}
                      alt={`picture of ${art.alt}`}
                      className="float-right"
                    />
                    <h2 className="p-2">
                      <span className="font-bold">Title: </span>
                      {art.title}
                    </h2>
                    <p className="p-2">
                      <span className="font-bold">Artist: </span>
                      {art.artist}
                    </p>
                    <p className="p-2">
                      <span className="font-bold">Date: </span>
                      {art.date}
                    </p>
                    <p className="p-2">
                      <span className="font-bold">Department:</span>
                      {art.department}
                    </p>
                  </li>
                </ul>
              );
            })}
          </section>
        </section>
      </section>
    )
  );
};

export default ArtCollections;
