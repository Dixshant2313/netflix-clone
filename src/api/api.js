import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const API_KEY = "9fc61851509d5e25d16a8b1c3f99c76a";
const results = 20;
const page = 1;

const endpoints = {
    originals: "/discover/tv",
    trending: "/trending/all/week",
    now_playing: "/movie/now_playing",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated",
    upcoming: "/movie/upcoming",
};

export const fetchData = (param) => {
    return axios.get(`${URL}${endpoints[param]}?api_key=${API_KEY}&page=${page}&results=${results}`)
}