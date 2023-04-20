import { CitizenNav } from "./CitizenNav"
import { HeroNav } from "./HeroNav"




export const NavBar = () => {
	
    
    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)
    
    if(helpUserObject.hero){
        return <HeroNav />
    }
    else{
        return <CitizenNav/>
    }
    
}

