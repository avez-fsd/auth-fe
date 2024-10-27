import { FormikProvider, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom"
import { INITIAL_VALUES_SIGNIN } from "../../constants";
import * as Yup from "yup";
import apiService from "../../services/api.service";
import { toast } from "react-toastify";
import { getErrorMessage, isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

function SignIn() {

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
        initialValues: INITIAL_VALUES_SIGNIN,
        validationSchema: Yup.object().shape({
          email: Yup.string().email().required("Email is a required"),
          password: Yup.string().required("Password is required")
        }),
        validateOnBlur: true,
        onSubmit: async (values) => {
          const {data, isError, error} = await apiService.signIn(values);
          if(!isError) {
            toast.success("Login successful");
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
      <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3" style={{
              backgroundImage: 'url("https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          }}>
              <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                  <div>
                      <h2 className="text-2xl font-bold text-white sm:text-3xl">Easy Generator</h2>
  
                      <p className="max-w-xl mt-3 text-gray-300">
                          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                          autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                          molestiae
                      </p>
                  </div>
              </div>
          </div>
  
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
              <div className="flex-1">
                  <div className="text-center">
                      <div className="flex justify-center mx-auto">
                          <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
                      </div>
  
                      <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                  </div>
  
                  <div className="mt-8">
                <FormikProvider value={formik as any}>
                  <form onSubmit={handleSubmit}>
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
                      <button
                        type="submit"
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 cursor-pointer"
                        disabled={isSubmitting || !isValid || !dirty}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </FormikProvider>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <Link
                    to={"/signup"}
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign Up
                  </Link>
                  .
                </p>
              </div>
              </div>
          </div>
      </div>
  </div>
      </>
    )
  }
  
  export default SignIn;
  