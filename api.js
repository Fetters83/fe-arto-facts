import axios from 'axios';

const BASE_URL = 'https://be-arto-facts.onrender.com/api/collections';


export const fetchChicagoArtworks = async (filters) => {
  const response = await axios.get(`${BASE_URL}/ArtInstituteChicago`, { params: filters });
  return response.data.ArtInstituteOfChicago || [];
};


export const fetchChicagoArtworkById = async (id) => {
  const response = await axios.get(`${BASE_URL}/ArtInstituteChicago/${id}`);
  return response.data;
};



export const fetchMetArtworks = async (filters) => {
  try {
  if(filters.searchTerm.length === 0) {filters.searchTerm = `""`}
  if(filters.searchTerm.length === 0 && filters.artistOrCulture) {delete filters.artistOrCulture}
  if(filters.searchTerm.length === 0 && filters.title) {delete filters.title}
  

console.log(filters)

    const adjustedFilters = {
      ...filters,
      searchTerm: filters.searchTerm || undefined, // Default to an empty string if undefined
    };


    const response = await axios.get(`${BASE_URL}/MetArtMuseum`, { params: filters });
    console.log(response)
    return response.data.metArtWorks || [];
  } catch (error) {
    console.log(error)
    throw error
  }

};


export const fetchMetArtworkById = async (id) => {
  const response = await axios.get(`${BASE_URL}/MetArtMuseum/${id}`);
  return response.data;
};


export const fetchMetDepartments = async () => {
  const response = await axios.get(`${BASE_URL}/MetArtMuseum/departments`);
  return response.data.departments || [];
};


export const fetchClevelandArtworks = async(params) =>{
  try {
    console.log(params)
    const response = await axios.get(`${BASE_URL}/ClevelandArtMuseum`,{params})
    console.log(response)
    const {clevelandArtPieces} = response.data
    /* console.log(clevelandArtPieces) */
    return clevelandArtPieces

  } catch (error) {
    console.log(error)
    throw error
  }

  
}

export const fetchClevelandArtworkById = async (id)=>{
  
  try {
    const response = await axios.get(`${BASE_URL}/ClevelandArtMuseum/${id}`)
    const {clevelandArtPiece} = response.data
    return clevelandArtPiece
  } catch (error) {
    throw error
  }


}
