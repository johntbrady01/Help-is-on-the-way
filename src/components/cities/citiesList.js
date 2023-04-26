import { useEffect, useState } from "react"
import { Cities} from "./cities"

export const CitiesList = () => {
    const [cities, setCities] = useState([])


    useEffect(
        () => {

        fetch(`http://localhost:8088/cities`)
        .then(response => response.json())
        .then((cityArray) =>{
            setCities(cityArray)
        })
    },
    [] 
)

const filteredCities= cities.filter(city => city.id<8)

return <>

<div className="citiesContainer">
<h2 className="allCities">The Cities we serve</h2>
</div>
            <div className="containerContainer">
            <article className="cityContainer">
            {   
                    filteredCities.map(city=> <Cities  key={`city--${city.id}`}
                    cityObject={city}/>)
            }
            
        
          </article>
          </div>

</>
}