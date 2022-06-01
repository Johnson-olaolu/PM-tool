export interface IProject {
  paid_amount : number
  comment: string;
  createdAt: Date;
  images: [];
  office_area_for_renovation: string;
  payment_status: string;
  project_description: string;
  project_type: string;
  receipt: [];
  inventory : {inventory : IInventory, amount :number}[]
  miscellaneous : IMiscellaneous[]
  renovation_category: string;
  state: string;
  start_date: Date;
  state_coordinator: string;
  status: string;
  title: Ititle;
  updatedAt: Date;
  __v: 0;
  _id: string;
}

export interface IInventory {
  _id : string
  name : string
  price : number
  vendor : string
}

export interface Ititle {
  _id: string
  title: string
}

export interface IMiscellaneous {
  name : string
  price : number
}