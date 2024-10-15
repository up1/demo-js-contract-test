import axios from 'axios';

export const getUser = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`API request failed${error}`);
  }
};
