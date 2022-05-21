import React from 'react'
import { Route, Routes } from 'react-router'
import CustomLayout from '../components/layout/CustomLayout'
import AuthRoutes from '../pages/auth'
import LandingRoutes from '../pages/landing'
import ProjectRoutes from '../pages/project'
import PrivateRoutes from './private.routes'
import PublicRoutes from './public.routes'
const NotFound = React.lazy(() => import('../pages/404'))


const IndexRoutes = () => {
  return (
    <React.Suspense fallback ={<div>loading</div>}>
        <Routes>
            <Route element ={<PublicRoutes/>}>
            <Route path='/*' element ={<LandingRoutes/>}/>
            <Route path='auth/*' element = {<AuthRoutes/>}/>
            </Route>
            <Route element = {<PrivateRoutes/>}>
              <Route  element ={<CustomLayout/>}>
                <Route path='project/*' element = {<ProjectRoutes/>}/>
              </Route>
              
            </Route>
            <Route  path='/404' element= {<NotFound/>}/>
        </Routes>
    </React.Suspense>
  )
}

export default IndexRoutes