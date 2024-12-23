import axios from 'axios';

const fetchMetArtWork = async () => {
  let artCollection = [];

  try {
    // Get all available IDs
    const getAvailableIds = await axios(`https://collectionapi.metmuseum.org/public/collection/v1/objects`);
    const availableIdArray = getAvailableIds.data.objectIDs.filter((id) => id >= 80 && id < 160);
  

    // Iterate through IDs
    for (let i = 0; i < availableIdArray.length; i++) {
      try {
      
        // Attempt to fetch art piece details
        const getArtPiece = await axios(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${availableIdArray[i]}`
        );

        // Check for a valid image and push to collection if valid
        if (getArtPiece.data.title && getArtPiece.data.creditLine && getArtPiece.data.objectEndDate && getArtPiece.data.department &&  getArtPiece.data.primaryImageSmall && getArtPiece.data.objectName) {
        /*   console.log(getArtPiece); */
          artCollection.push({
            title: getArtPiece.data.title,
            artist: getArtPiece.data.creditLine,
            date: getArtPiece.data.objectEndDate,
            department: getArtPiece.data.department,
            smallImg: getArtPiece.data.primaryImageSmall,
            alt: getArtPiece.data.objectName,
          });
        }
      } catch (error) {
        // Log the error and continue with the next ID
        console.error(`Error fetching object ID ${availableIdArray[i]}:`, error.message);
      }
    }


    return artCollection;
  } catch (error) {
    console.error('Error fetching available IDs:', error.message);
    return []; // Return an empty array in case of failure
  }
};




export default fetchMetArtWork;
