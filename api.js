import axios from 'axios';

const BASE_URL = 'https://be-arto-facts.onrender.com/api/collections';


export const fetchChicagoArtworks = async (filters) => {
  const response = await axios.get(`${BASE_URL}/ArtInstitueChicago`, { params: filters });
  return response.data.ArtInstituteOfChicago || [];
};


export const fetchChicagoArtworkById = async (id) => {
  const response = await axios.get(`${BASE_URL}/ArtInstitueChicago/${id}`);
  return response.data;
};


export const fetchRijksArtworks = async (filters) => {
  const response = await axios.get(`${BASE_URL}/RijksMuseum`, { params: filters });
  return response.data.rijksArtWorks || [];
};


export const fetchRijksArtworkById = async (id) => {
  const response = await axios.get(`${BASE_URL}/RijksMuseum/${id}`);
  return response.data;
};


export const fetchMetArtworks = async (filters) => {
  const response = await axios.get(`${BASE_URL}/MetArtMuseum`, { params: filters });
  return response.data.metArtWorks || [];
};


export const fetchMetArtworkById = async (id) => {
  const response = await axios.get(`${BASE_URL}/MetArtMuseum/${id}`);
  return response.data;
};


export const fetchMetDepartments = async () => {
  const response = await axios.get(`${BASE_URL}/MetArtMuseum/departments`);
  return response.data.departments || [];
};



