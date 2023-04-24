import { Link } from "react-router-dom"
import "./heroes.css"

export const Heroes = ({heroObject}) => {



    return <>

  <section className="container">
    <div className="heroes">

    <div><img src={heroObject.photo} className='photos'></img></div>

    <div className="hero">
        <div className="words">
        <Link className="name">{heroObject?.user?.name}</Link>
        <div className="city">Home: {heroObject?.cities?.name}</div>
        </div>
    </div>
    

        </div>
    </section>
    
    </>
}