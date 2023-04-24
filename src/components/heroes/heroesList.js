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

return <>

<h2>Your Heroes</h2>
            <article>
            {   
                    filteredHeroes.map(hero=> <Heroes  key={`hero--${hero.id}`}
                    heroObject={hero}/>)
            }
            
        
          </article>
    



</>
}