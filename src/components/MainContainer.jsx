import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies)

    if (!movies) return null
    const { original_title, overview, id } = movies[0]
    return (
        <div className="relative w-full overflow-hidden bg-black pt-[10%] sm:pt-0">
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    )
}

export default MainContainer