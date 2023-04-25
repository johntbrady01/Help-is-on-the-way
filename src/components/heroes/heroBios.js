import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const HeroBios = () => {
    const {heroId}=useParams()
    const [hero, updateHero]=useState({})

    useEffect(
        () => {
           fetch(`http://localhost:8088/heroes?_expand=user&_expand=cities&id=${heroId}`)
                .then(response => response.json())
                .then((data) =>{
                    const singleHero=data[0]
                    updateHero(singleHero)
                })
        },
        [heroId] 
    )


    return <section className="heroBio">
    <header className="hero_header"><img src={hero?.photo} className="photos"></img> {hero?.user?.name}</header>
    <div>{hero?.bio}</div>
    <div>Location: {hero?.cities?.name}</div>
    <div><img src={hero?.symbol} className="photos"></img></div>
    <div>Partner: {hero?.partnersName}</div>
    <div><img src={hero?.partnersSymbol} className="photos"></img> </div>
</section>
}