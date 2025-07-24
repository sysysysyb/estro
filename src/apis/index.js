import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getAllPlaces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/places`);
    return response.data.places;
  } catch (err) {
    throw err.response;
  }
};

export const getFavoritesPlaces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/places`);
    return response.data.places;
  } catch (err) {
    throw err.response;
  }
};

export const addFavoritesPlace = async (place) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/places`,
      { place: place },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (err) {
    throw err.response;
  }
};

export const removeFavoritesPlace = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/places/${id}`);
    return response;
  } catch (err) {
    throw err.response;
  }
};
