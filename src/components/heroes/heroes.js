import { Link } from "react-router-dom"
import "./heroes.css"

export const Heroes = ({heroObject}) => {



    return <>

  <section className="container">
    <div className="heroes">

    <div className="hero">
        <div>{heroObject?.user?.name}</div>
        <div>Home: {heroObject?.cities?.name}</div>
    </div>
    
        <div><img src={heroObject.photo} className='photos'></img></div>
        
        </div>
    </section>
    
    </>
}