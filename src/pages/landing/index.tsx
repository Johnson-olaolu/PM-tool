import React from 'react'
import { Route, Routes } from 'react-router'
const LandingPage = React.lazy(()=> import('./LandingPage'))

const LandingRoutes = () => {
  return (
    <Routes>
        <Route index element ={<LandingPage/>}/>
    </Routes>
  )
}

export default LandingRoutes