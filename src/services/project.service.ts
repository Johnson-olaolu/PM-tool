import { IProject } from "../interface/project.interface";
import axiosService from "./axios.service";

const createNewProject = (payload: {
  title: string;
  project_type: string;
  renovation_category: string;
  office_area_for_renovation: string;
  project_description: string;
  amount: string;
  images?: string[];
  receipt?: string[];
  state: string;
  address: string;
}): Promise<IProject> => {
  return axiosService
    .post(`project/create-project`, payload)
    .then((res) => {
      return res.data.newProject;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const fetchAllProjects = (state?: string, status?: string, payment_status?: string): Promise<IProject[]> => {
  return axiosService
    .get(`project/get-all-projects?state=${state ? state : ""}&status=${status ? status : ""}&payment_status=${payment_status ? payment_status : ""}`)
    .then((res) => {
      return res.data.project;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const fetchSingleProject = (id: string): Promise<IProject> => {
  return axiosService
    .get(`https://monie-point.herokuapp.com/api/v1/project/get-project/${id}`)
    .then((res) => {
      return res.data.project;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const updateSingleProject = (project_id: string, payload: { name: string; value: any }) => {
  return axiosService
    .patch(`https://monie-point.herokuapp.com/api/v1/project/update-project/${project_id}`, payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const projectService = {
  createNewProject,
  fetchAllProjects,
  fetchSingleProject,
  updateSingleProject,
};
