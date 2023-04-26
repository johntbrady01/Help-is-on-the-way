import { Link } from "react-router-dom"
import "./cities.css"

export const Cities = ({cityObject, heroes}) => {


    const filteredHeroes= heroes.find(hero => hero.citiesId===cityObject.id)
  

    return <>

  <section className="citycontainer">
        <div className="cities">
            <div className="oneCity">
                <Link  to={`/cities/${cityObject.id}`}className="cityName">{cityObject?.name}</Link>
                <div className="cityBio">{cityObject?.bio} <Link  to={`/heroes/${filteredHeroes?.id}`}className="heroesName">{filteredHeroes?.user?.name}</Link>. </div>
            </div>
            <div><img src={cityObject.photo} className='cityPhotos'></img></div>
        </div>
    </section>
    
    </>
}