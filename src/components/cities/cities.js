import { Link } from "react-router-dom"
import "./cities.css"

export const Cities = ({cityObject}) => {



    return <>

  <section className="citycontainer">
        <div className="cities">
            <div className="oneCity">
                <Link  to={`/cities/${cityObject.id}`}className="cityName">{cityObject?.name}</Link>
                <div>{cityObject?.bio}</div>
            </div>
            <div><img src={cityObject.photo} className='cityPhotos'></img></div>
        </div>
    </section>
    
    </>
}