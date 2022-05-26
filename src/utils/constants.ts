interface IProjectCategories {
    name : string,
    subCategories : string[]
}

export const projectCategories : IProjectCategories[] = [
  { name: "Fixed Expenses", subCategories: ["State office renovation"] },
  {
    name: "Recurring expenses",
    subCategories: ["Operations", "State office requests", "Branding"],
  },
];


export enum userTypes {
  STATE_COORDINATOR = "State-Coordinator",
  ADMIN = "Admin",
  SENIOR_ADMIN ="Senior-Admin",
  FINANCE = "Finance"
}