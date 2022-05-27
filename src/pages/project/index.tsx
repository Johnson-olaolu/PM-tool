import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import ProjectDashboard from './ProjectDashboard'
import ViewAllProjects from './ViewAllProjects'
import ViewSingleProject from './ViewSingleProject'
import ViewSingleProjectAdmin from './admin/ViewSIngleProjectAdmin'
import ViewAllProjectsAdmin from './admin/ViewAllProjectsAdmin'
const CreateProject = React.lazy(() => import('./CreateProject'))

const ProjectRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element ={<ProjectDashboard/>}/>
            <Route path='/all' element ={<ViewAllProjects/>}/>
            <Route path='/create' element ={<CreateProject/>}/>
            <Route path='/:projectId' element = {<ViewSingleProject/>}/>

            {/* admin routes */}
            <Route path='/admin/all' element ={<ViewAllProjectsAdmin/>}/>
            <Route path='/admin/:projectId' element = {<ViewSingleProjectAdmin/>}/>

            <Route path='/*' element = {<Navigate to={"/404"}/>} />
        </Routes>
    </>
  )
}

export default ProjectRoutes