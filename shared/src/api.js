import axios from 'axios';

const getUser = async (id) => {
  // Get URL from environment variable
  // const url = process.env.BACKEND_URL || 'http://localhost:3000';
  const url = import.meta.env.BACKEND_URL || 'http://localhost:3000';
  try {
    const response = await axios.get(`${url}/users/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default getUser;
