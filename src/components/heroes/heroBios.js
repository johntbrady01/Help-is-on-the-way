
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"


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


    return <>
    <div className="bioContainer">
        <section className="heroBio">
            <div className="bioDiv">
                <div className="divTop"><img src={hero?.photo} className="bioPhotos"></img></div>
                <div className="divTwo"> <header className="bioName">{hero?.user?.name}</header></div>
            </div>

           <div className="bioDiv"><div className="bioText">{hero?.bio}</div></div>

            <div className="bioDivThree">
                <div className="div"><div className="otherBioText">Location: <Link  to={`/cities/${hero?.cities?.id}`}className="cityLink"> {hero?.cities?.name}</Link></div></div>
                <div className="divTwo"><img src={hero?.symbol} className="bioSymbol"></img></div>
            </div>

            <div className="bioDivTwo">
                <div className="div"><div className="otherBioText">Partner: {hero?.partnersName}</div></div>
                <div className="divTwo"><img src={hero?.partnersSymbol} className="bioSymbol"></img> </div>
            </div>
        </section>
    </div>

         </>
}
