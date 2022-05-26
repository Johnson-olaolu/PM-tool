export interface IProject {
  vendor: string;
  amount: number;
  comment: string;
  createdAt: Date;
  images: [];
  office_area_for_renovation: string;
  payment_status: string;
  project_description: string;
  project_type: string;
  receipt: [];
  inventory : IInventory[]
  renovation_category: string;
  state: string;
  state_coordinator: string;
  status: string;
  title: string;
  updatedAt: Date;
  __v: 0;
  _id: string;
}

export interface IInventory {
  name : string
  amount : number
  price : number
}