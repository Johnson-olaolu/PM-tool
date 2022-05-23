import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import ViewAllProjects from './ViewAllProjects'
import ViewSingleProject from './ViewSingleProject'
const CreateProject = React.lazy(() => import('./CreateProject'))

const ProjectRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element ={<ViewAllProjects/>}/>
            <Route path='/create' element ={<CreateProject/>}/>
            <Route path='/:projectId' element = {<ViewSingleProject/>}/>
            <Route path='/*' element = {<Navigate to={"/404"}/>} />
        </Routes>
    </>
  )
}

export default ProjectRoutes