const axios =require("axios").default;
import { TMDB_API_KEY,TMDB_BASE_URL,TMDB_IMAGE_BASE_URL,ENDPOINTS,YOUTUBE_BASE_URL } from "../constants/Urls";
import Languages from "../constants/Languages";

const TMDB_HTTP_REQUEST = axios.create({
    baseURL:TMDB_BASE_URL,
    params:{
        api_key:TMDB_API_KEY,
    },
});

const getNowPlayingMovies =()=>
    TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYNG_MOVIES);

const getUPComingMovies=()=>TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES)
const getTopRatedMovies=()=>TMDB_HTTP_REQUEST.get(ENDPOINTS.TOP_RATED_MOVIES)

const getPopularMovies=()=>TMDB_HTTP_REQUEST.get(ENDPOINTS.POPULAR_MOVIES)
const getSearchedMovies=({query,include_adult})=>TMDB_HTTP_REQUEST.get(`${ENDPOINTS.SEARCH_MOVIES}?query=${query}&include_adult=${include_adult}`)


const getGenre=()=>TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRE)

const getMovieById=(movieId,append_to_response="")=>TMDB_HTTP_REQUEST.get(`${ENDPOINTS.MOVIE_DETAILS}/${movieId}`, append_to_response ? {params:{append_to_response}}:null);

const getPoster =(path)=>`${TMDB_IMAGE_BASE_URL}/original${path}`

const getVideo=(key)=>`${YOUTUBE_BASE_URL}?v=${key}`

const getLanguages=(language_iso)=>Languages.find(language=>language.iso_639_1 === language_iso);


export {
    getNowPlayingMovies,
    getPoster,getLanguages,
    getUPComingMovies,
    getGenre,
    getMovieById,
    getVideo,
    getPopularMovies,
    getTopRatedMovies,
    getSearchedMovies

         }