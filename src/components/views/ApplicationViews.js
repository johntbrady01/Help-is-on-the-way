import { CitizenViews } from "./CitizenView"
import { HeroViews } from "./HeroView"



export const ApplicationViews = () => {
	
    
    const localHelpUser=localStorage.getItem("help_user")
    const helpUserObject = JSON.parse(localHelpUser)
    
    if(helpUserObject.hero){
        return <HeroViews />
    }
    else{
        return <CitizenViews />
    }
    
}
