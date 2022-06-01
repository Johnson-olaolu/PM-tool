import { IInventory, IMiscellaneous, IProject } from "../interface/project.interface";
import axiosService from "./axios.service";

const createNewProject = (payload: {
  title_id: string;
  project_type: string;
  renovation_category: string;
  office_area_for_renovation: string;
  project_description: string;
  amount_paid: number;
  start_date: Date | null;
  images?: string[];
  inventory?: { inventory_id: string; amount: number }[];
  miscellaneous?: IMiscellaneous[];
  receipt?: string[];
  state: string;
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
      return res.data.projects;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const fetchSingleProject = (id: string): Promise<IProject> => {
  return axiosService
    .get(`project/get-project/${id}`)
    .then((res) => {
      return res.data.project;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const updateSingleProject = (project_id: string, payload: { name: string; value: any }) => {
  const { name, value } = payload;
  return axiosService
    .patch(`project/update-project/${project_id}`, { [name]: value })
    .then((res) => {
      return res.data.updatedProject;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const approveProject = (project_id: string): Promise<IProject> => {
  return axiosService
    .patch(`project/approve-project/${project_id}`)
    .then((res) => {
      return res.data.updatedProject;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const rejectProject = (project_id: string, comment: string): Promise<IProject> => {
  return axiosService
    .patch(`project/reject-project/${project_id}`, { comment: comment })
    .then((res) => {
      return res.data.updatedProject;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const fetchProjectsTitles = () => {
  return axiosService
    .get(`title/get/all`)
    .then((res) => {
      return res.data.titles;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const projectService = {
  createNewProject,
  rejectProject,
  fetchAllProjects,
  fetchSingleProject,
  updateSingleProject,
  approveProject,
  fetchProjectsTitles
};
