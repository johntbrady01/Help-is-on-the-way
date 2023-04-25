import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../home/home"
import { HeroBios } from "../heroes/heroBios"
import { HeroesList } from "../heroes/heroesList"
import { RequestList } from "../requests/RequestList"


export const HeroViews = () => {
	return (
        <Routes>
                    <Route path="home" element={<Home /> } />

                <Route path="requests" element={<RequestList /> } />
                <Route path="heroes" element={<HeroesList /> } />
                <Route path="heroes/:heroId" element={<HeroBios /> } />

        </Routes>
    )
}