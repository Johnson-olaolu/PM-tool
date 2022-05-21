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
