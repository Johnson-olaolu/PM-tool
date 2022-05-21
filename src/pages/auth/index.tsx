import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
const  Login  = React.lazy(() => import('./Login'))

const AuthRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/login' element = {<Login/>} />
            <Route path='/*' element= {<Navigate to={"/404"}/>}/>
        </Routes>
    </>
  )
}

export default AuthRoutes