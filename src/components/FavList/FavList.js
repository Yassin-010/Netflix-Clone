import './FavList.css'
import MovieList from '../MovieList/MovieList.js';
function FavList() {
    return (<>
        <MovieList isFav={true}/>
    </>)
}

export default FavList;