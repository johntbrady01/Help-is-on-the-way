import { useEffect, useState } from "react"
import { Heroes} from "./heroes"

export const HeroesList = () => {
    const [heroes, setHeroes] = useState([])


    useEffect(
        () => {

        fetch(`http://localhost:8088/heroes?_expand=user&_expand=cities`)
        .then(response => response.json())
        .then((heroArray) =>{
            setHeroes(heroArray)
        })
    },
    [] 
)

const filteredHeroes= heroes.filter(hero => hero.id<9)

return <article className="addMargin">

<div className="yourHeroesContainer">
<h2 className="yourHeroes">Your Heroes</h2>
</div>
            <div className="containerContainer">
            <article className="heroesContainer">
            {   
                    filteredHeroes.map(hero=> <Heroes  key={`hero--${hero.id}`}
                    heroObject={hero}/>)
            }
            
        
          </article>
          </div>
    



</article>
}