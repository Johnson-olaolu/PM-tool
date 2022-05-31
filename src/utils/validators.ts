import * as yup from "yup"

export const loginValidator = yup.object().shape({
    email : yup.string().email("Enter valid email").required("Please enter email"),
    password : yup.string().required("Please enter password")
})

export const createProjectValidatorSchema = yup.object().shape({
    title: yup.string().required("Please enter title"),
    project_description: yup.string().required("Please enter a project description"),
    project_type: yup.string().required("Please enter project type"),
    renovation_category: yup.string().required("Please select a category"),
    office_area_for_renovation: yup.string().required("Please enter a renovation area"),
    inventory : yup.array().required("Please add Inventory"),
    //amount_paid : yup.number().min(10, "Amount paid must be more than 10" ).required("Amount paid must be more than 10"),
    miscellanous : yup.array(),
    images : yup.array(),
    receipt : yup.array(),
    state: yup.string().required("Please Enter a state")
})


export const createInventoryValidatorSchema = yup.object().shape({
    name : yup.string().required("Please enter a name"),
    amount : yup.number().min(1, "Amount must me more than 0").required("Amount paid must be more than 10"),
    price : yup.number().min(10,"Price must be more than 10").required("Price paid must be more than 10"),
    vendor : yup.string().required("Please Enter a vendor")
})

export const createMiscellaneousValidatorSchema = yup.object().shape({
    name : yup.string().required("Please enter a name"),
    price : yup.number().min(10,"Price must be more than 10").required("Price paid must be more than 10"),
})

export const rejectProjectValidatorSchema = yup.object().shape({
    comment : yup.string().required("Please enter a comment")
})