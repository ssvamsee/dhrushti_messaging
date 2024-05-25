import * as Yup from "yup"

export const signUpSchema = Yup.object({
    name: Yup.string().required("Full Name is Required").matches(/^[a-zA-Z_ ]*$/,"No Special Characters Are Allowed").min(3,"Name Must Be Between 3 to 20 Characters").max(20,"Name Must Be Between 3 to 20 Characters"),
    email: Yup.string().required("Email is Required").email("Invalid Email Address"),
    password: Yup.string().required("Password is Required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password Must Be 6 Characters Long, At Least One Uppercase, One Lowercase, One Number and One Special Character"),
    staus:Yup.string().max(64,"Status Must Be Less Than 64 Characters")
})

export const signInSchema = Yup.object({
    email: Yup.string().required("Email is Required").email("Invalid Email Address"),
    password: Yup.string().required("Password is Required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password Must Be 6 Characters Long, At Least One Uppercase, One Lowercase, One Number and One Special Character"),
})