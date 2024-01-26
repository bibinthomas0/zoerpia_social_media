// api.js
import axios from 'axios';
import { useSelector } from 'react-redux';
const api = axios.create();
const baseURL = "http://127.0.0.1:8000"; 

// Function to check if the user is blocked
const IsUserBlocked = async (user) => {
  const data = { user };

  try {
    
    const res = await axios.post(baseURL + "/api/accounts/isblocked/", data);

    if (res.status === 200) {
      console.log("User is not blocked");
      return false;
    } else {
      console.log('User is blocked');
      return true;
    }
  } catch (error) {
    console.error('Error checking user blocking status:', error);
    return true; // Assume blocked in case of an error
  }
};

api.interceptors.request.use(
  async (config) => {
    const authentication_user = useSelector(state => state.authentication_user)
    const blocked = await IsUserBlocked(authentication_user.name);

    if (blocked) {
      console.log('User is blocked. Redirecting...');
      // Handle blocked user (e.g., redirect to a blocked page)
      // For example:
      // window.location.href = '/blocked-page';
      return Promise.reject('User is blocked');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
