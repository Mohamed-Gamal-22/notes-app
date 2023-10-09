import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    setLoading(true);
    // console.log(values);
    /// call api
    let { data } = await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
      .catch((err) => {
        // console.log(err.response.data.msg);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.msg,
        });
        setLoading(false);
      });

    setLoading(false);
    Swal.fire({
      icon: "success",
      title: "Congratulations",
      text: "you are registerd successfully, go to login now",
    });
    navigate("/login");
    // console.log(data);
  }

  const phoneRegex = /^01[0125][0-9]{8}$/gm;

  const validation = yup.object({
    name: yup
      .string()
      .required("name is required")
      .max(10, "max length is 10 chars")
      .min(3, "min length is 3 chars"),
    email: yup
      .string()
      .required("email is required")
      .email("email is not valid"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password must be more than 6 chars"),
    age: yup
      .number()
      .required("age is required")
      .min(18, "you should at least 18 years old")
      .max(60, "max age is 60 years "),
    phone: yup
      .string()
      .required("phone is requierd")
      .matches(phoneRegex, "not valid numebr!"),
  });

  const fomrik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="parent  text-white vh-100 w-75 mx-auto d-flex  align-items-center">
        <div className="container h-100 rounded-3 p-4">
          <div className="row h-100 bg-white rounded-3 text-center justify-content-center">
            <div className="col-md-5 bg-left rounded-3">
              <div className="item text-capitalize h-100 d-flex justify-content-center flex-column align-items-center ">
                <h2 className="fw-bold fs-1 mb-3">welcome back!</h2>
                <p className="text-white">
                  to keep conected with us please login with your personal
                  information
                </p>
                {/* <Link className="gotologin" to="/login">
                  Login
                </Link> */}
                {/* <p className="gotologin">login</p> */}
                <Link className="gotologin" to="/login">
                  Login
                </Link>
              </div>
            </div>
            <div className="col-md-7 bg-white text-dark rounded-3">
              <div className="d-flex h-100 justify-content-center flex-column align-items-center">
                <h2 className="fs-1 text-main text-capitalize fw-bold ">
                  create account
                </h2>
                <div className="icons my-3">
                  <i className="fa-brands icon fa-facebook"></i>
                  <i className="fa-brands icon mx-4 fa-instagram"></i>
                  <i className="fa-brands icon fa-google"></i>
                </div>
                <h3 className="h6 text-dark mb-2">
                  or create your account here
                </h3>
                <form onSubmit={fomrik.handleSubmit} className="w-75">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="name"
                    onChange={fomrik.handleChange}
                    onBlur={fomrik.handleBlur}
                  />
                  {fomrik.errors.name && fomrik.touched.name ? (
                    <p className="text-danger fw-bold text-start fs-small">
                      {fomrik.errors.name}
                    </p>
                  ) : (
                    ""
                  )}

                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Enter Email"
                    name="email"
                    onChange={fomrik.handleChange}
                    onBlur={fomrik.handleBlur}
                  />
                  {fomrik.errors.email && fomrik.touched.email ? (
                    <p className="text-danger fw-bold text-start fs-small">
                      {fomrik.errors.email}
                    </p>
                  ) : (
                    ""
                  )}

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    onChange={fomrik.handleChange}
                    onBlur={fomrik.handleBlur}
                  />
                  {fomrik.errors.password && fomrik.touched.password ? (
                    <p className="text-danger fw-bold text-start fs-small">
                      {fomrik.errors.password}
                    </p>
                  ) : (
                    ""
                  )}

                  <input
                    type="number"
                    className="form-control my-2"
                    placeholder="Enter Age"
                    name="age"
                    onChange={fomrik.handleChange}
                    onBlur={fomrik.handleBlur}
                  />
                  {fomrik.errors.age && fomrik.touched.age ? (
                    <p className="text-danger fw-bold text-start fs-small">
                      {fomrik.errors.age}
                    </p>
                  ) : (
                    ""
                  )}

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone"
                    name="phone"
                    onChange={fomrik.handleChange}
                    onBlur={fomrik.handleBlur}
                  />
                  {fomrik.errors.phone && fomrik.touched.phone ? (
                    <p className="text-danger fw-bold text-start fs-small">
                      {fomrik.errors.phone}
                    </p>
                  ) : (
                    ""
                  )}

                  <button
                    type="submit"
                    className="btn-reg mt-3 w-100 d-flex justify-content-center"
                  >
                    {loading ? (
                      <Oval
                        height={30}
                        width={30}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#ddd"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
