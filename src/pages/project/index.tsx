import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
const CreateProject = React.lazy(() => import('./CreateProject'))

const ProjectRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/create' element ={<CreateProject/>}/>
            <Route path='/*' element = {<Navigate to={"/404"}/>} />
        </Routes>
    </>
  )
}

export default ProjectRoutes