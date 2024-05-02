import Config from "../../package.json"

const TMDB_BASE_URL="https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL ="https://image.tmdb.org/t/p";
const YOUTUBE_BASE_URL="https://www.youtube.com/watch"
const TMDB_API_KEY = Config.projectConfig.apiKey;

const   ENDPOINTS ={
   NOW_PLAYNG_MOVIES :"/movie/now_playing",
   UPCOMING_MOVIES : "/movie/upcoming",
   GENRE:"/genre/movie/list",
   MOVIE_DETAILS:"/movie",
   POPULAR_MOVIES:"/movie/popular",
   TOP_RATED_MOVIES:"/movie/top_rated",
   SEARCH_MOVIES:"/search/movie"
}

const APPEND_TO_RESPONSE ={
    VIDEOS:'videos',
    CREDITS:'credits',
    RECOMMENDATIONS:'recommendations',
    SIMILAR:"similar"
}

export {
    TMDB_BASE_URL,
    TMDB_IMAGE_BASE_URL,
    TMDB_API_KEY,
    ENDPOINTS,
    APPEND_TO_RESPONSE,
    YOUTUBE_BASE_URL
}