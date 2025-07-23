import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getAllPlaces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/places`);
    return response.data.places;
  } catch (err) {
    return err.response;
  }
};

export const getFavoritesPlaces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/places`);
    return response.data.places;
  } catch (err) {
    return err.response;
  }
};
