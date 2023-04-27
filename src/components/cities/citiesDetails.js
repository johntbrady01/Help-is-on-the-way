
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export const CityDetails = () => {
    const {cityId}=useParams()
    const [city, updateCity]=useState({})
    const [heroes, updateHeroes]=useState()


    const navigate=useNavigate()

    useEffect(
        () => {
           fetch(`http://localhost:8088/cities?id=${cityId}`)
                .then(response => response.json())
                .then((data) =>{
                    const singleCity=data[0]
                    updateCity(singleCity)
                })
        },
        [cityId] 
    )

    useEffect(
        () => {
           fetch(`http://localhost:8088/heroes?_expand=user`)
                .then(response => response.json())
                .then((heroesArray) =>{
                    updateHeroes(heroesArray)
                })
        },
        [] 
    )

  
    





  
    const filteredHeroes = heroes?.find(hero => hero.citiesId===city.id)

    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)
        
    

    return <>
    <div className="oneCityContainer">
        <section className="city">
                <div className="cityDivName">{city?.name}</div>
                <div className="cityDivPhoto"><img src={city?.photo} className="cityPhoto"></img></div>

                <div className="cityDivBio">
                <div className="cityPageBioContainer">
                <div className="cityPageBio">{city?.bio}</div>
                </div>
                <div className="cityHeroesName">Main Hero: <Link  to={`/heroes/${filteredHeroes?.id}`}className="cityHeroesName">{filteredHeroes?.user?.name}</Link></div>
                </div>
        </section>
    </div>

         </>
         
}