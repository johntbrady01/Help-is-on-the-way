import { Link } from "react-router-dom"
import "./heroes.css"

export const Heroes = ({heroObject}) => {



    return <>

  <section className="herocontainer">
    <div className="heroes">

    <div><img src={heroObject.photo} className='photos'></img></div>

    <div className="hero">
        <div className="words">
        <Link  to={`/heroes/${heroObject.id}`}className="name">{heroObject?.user?.name}</Link>
        <div>Location: <Link  to={`/cities/${heroObject?.cities?.id}`}className="cityLink"> {heroObject?.cities?.name}</Link></div>
        <div>Partner: {heroObject?.partnersName}</div>
        </div>
    </div>
    

        </div>
    </section>
    
    </>
}