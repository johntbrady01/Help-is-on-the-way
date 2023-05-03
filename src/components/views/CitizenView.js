import { Outlet, Route, Routes, ScrollRestoration } from "react-router-dom"
import { Home } from "../home/home"
import { HeroBios } from "../heroes/heroBios"
import { HeroesList } from "../heroes/heroesList"
import { RequestForm } from "../requests/RequestForm"
import { RequestList } from "../requests/RequestList"
import { UpdateRequest } from "../requests/updateRequest"
import { CitiesList } from "../cities/citiesList"
import { CityDetails } from "../cities/citiesDetails"
import ScrollToTop from "../scroll/scroll"

export const CitizenViews = () => {
	return (
                  <ScrollToTop>
        <Routes>

                 <Route path="home" element={<Home /> } />

                <Route path="requests" element={<RequestList /> } />
                <Route path="requests/create" element={ <RequestForm /> } />
                <Route path="/requests/:requestId/edit" element={<UpdateRequest/>} />
                <Route path="heroes" element={<HeroesList /> } />
                <Route path="heroes/:heroId" element={<HeroBios /> } />
                <Route path="cities" element={<CitiesList /> } />
                <Route path="cities/:cityId" element={<CityDetails /> } />
        </Routes>
                </ScrollToTop>
    )
}