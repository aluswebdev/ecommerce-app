
import API from "../api/axiosAPI";

export const fetchSuggestions = async (query) => {
  const res = await API.get(`/search/suggestions?query=${query}`);
  console.log(res.data);
  
  return res.data || [];
};

export const fetchSearchResults = async (query, filters={}) => {
  const params = { query, ...filters };
  const res = await API.get(`/search/results`, { params });
  // console.log(res.data.length);
  return res.data || [];
};
