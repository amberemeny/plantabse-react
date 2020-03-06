import axios from 'axios'

const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 3000,
    withCredentials: true,
  });

  const Axios = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 3000,
    withCredentials: true,
    headers:{'X-CSRFTOKEN': getCookie('csrftoken')}
  });

async function call(config) {
  try {
    return await Axios(config)
  } catch (error) {
    if (error.response && error.response.status === 401) {
    }
  }
}

// Get Plants
export const getPlants = () => call({ method: 'get', url: '/plants/' })

// Create Plant
export const addPlant = (value) => call({method: 'post', url: '/plants/', data: value})

// Delete Plant
export const deletePlant = (plant) => call({method: 'delete', url: `/plants/${plant}/`})

// Create Observation
export const addObservation = (value) => call({method: 'post', url: '/observations/', data: value})

// Index Observations
export const indexObservations = (plant) => call({method: 'get', url: `plants/${plant}/observations/`})

// Delete Observation
export const deleteObservations = (plant, observation) => call({method: 'delete', url: `/plants/${plant}/observations/${observation}/`})