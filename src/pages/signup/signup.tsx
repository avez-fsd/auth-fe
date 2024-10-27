import { FormikProvider, useFormik } from "formik";
import { INITIAL_VALUES_SIGNUP } from "../../constants";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import { toast } from "react-toastify";
import { getErrorMessage, isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

function SignUp() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    if(isAuthenticated()) navigate('/');
    else setLoading(false)
},[])
  
  const {
    dirty,
    isValid,
    isSubmitting,
    handleSubmit,
    resetForm,
    values,
    ...formik
  } = useFormik({
    initialValues: INITIAL_VALUES_SIGNUP,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is a required"),
      email: Yup.string().email().required("Email is a required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[\W_]/,
          "Password must contain at least one special character"
        ),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    validateOnBlur: true,
    onSubmit: async (values) => {
      const {data, isError, error} = await apiService.signUp(values);
      if(!isError) {
        toast.success("Sign up successful");
        localStorage.setItem(
          "token",
          data.data.token
        )
        navigate("/")
        resetForm();
      } else {
        toast.error(getErrorMessage(error))
      }
    },
  });

  if(loading) return <Loader/>

  return (
    <>
      <div>
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Easy Generator
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-auto h-7 sm:h-8"
                    src="https://merakiui.com/images/logo.svg"
                    alt=""
                  />
                </div>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Sign up to access your account
                </p>
              </div>

              <div className="mt-8">
                <FormikProvider value={formik as any}>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        >
                          Name
                        </label>
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={values.name}
                        autoComplete="off"
                      />
                      <p className="text-red-500 text-xs mt-1">
                        {formik.touched.name && formik.errors.name}
                      </p>
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        >
                          Email Address
                        </label>
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@example.com"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={values.email}
                        autoComplete="off"
                      />
                      <p className="text-red-500 text-xs mt-1">
                        {formik.touched.email && formik.errors.email}
                      </p>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="password"
                          className="text-sm text-gray-600 dark:text-gray-200"
                        >
                          Password
                        </label>
                      </div>

                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your Password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={values.password}
                      />

                      <p className="text-red-500 text-xs mt-1">
                        {formik.touched.password && formik.errors.password}
                      </p>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <label
                          htmlFor="password"
                          className="text-sm text-gray-600 dark:text-gray-200"
                        >
                          Confirm Password
                        </label>
                      </div>

                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={values.confirmPassword}
                      />

                      <p className="text-red-500 text-xs mt-1">
                        {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword}
                      </p>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 cursor-pointer"
                        disabled={isSubmitting || !isValid || !dirty}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </FormikProvider>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Already have account?{" "}
                  <Link
                    to={"/login"}
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign In
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

