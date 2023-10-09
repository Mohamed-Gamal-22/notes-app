import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Swal from "sweetalert2";
import Note from "../Note/Note.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [dataError, setDataErr] = useState(false);
  const [notes, setNotes] = useState([]);
  async function addNote(values) {
    // console.log(values);
    let { data } = await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
        headers: {
          token: `
      3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        // console.log(err.response.data.msg);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.msg,
        });
      });

    Swal.fire({
      icon: "success",
      title: "Note Added successfully",
    });
    getAllNotes();
    console.log(data);
  }

  async function getAllNotes() {
    if (!(localStorage.getItem("token") && notes)) {
      return;
    }
    try {
      let { data } = await axios.get(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes(data.notes);
      setDataErr(false);
      // setDataErr(!dataError);
      // console.log(data);
      // console.log("done");
    } catch (err) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: err.response.data.msg,
      // });
      // console.log(err.response.data.msg);
      setDataErr(true);
      // setDataErr(!dataError);
    }

    // console.log(data);
    // setErr(false);
    // .catch((err) => {

    // });

    // console.log(data.notes);
  }

  const validationSchema = yup.object({
    title: yup
      .string()
      .required("title is required")
      .max(10, "max length is 10 ")
      .min(3, "min length is 3"),
    content: yup
      .string()
      .required("content is required")
      .max(20, "max length is 20")
      .min(3),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema,
    onSubmit: addNote,
  });

  async function deleteNote(id) {
    try {
      let { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: {
            token: `
      3b8ny__${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      getAllNotes();
    } catch (err) {
      console.log(err);
      setDataErr(true);
    }

  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <div className="notes bg-white text-dark">
              <div className="row g-2">
                {dataError ? (
                  <h2 className="text-danger fw-bold text-capitalize text-center">
                    data not found
                  </h2>
                ) : notes.length > 0 ? (
                  notes.map((note) => (
                    <Note key={note._id} note={note} deleteNote={deleteNote} />
                  ))
                ) : (
                  <h2 className="text-danger fw-bold text-capitalize text-center">
                    data not found
                  </h2>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="title"
                className="form-control my-2 w-100"
                placeholder="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title ? (
                <p className="fw-bold text-warning text-start fs-small">
                  {formik.errors.title}
                </p>
              ) : (
                ""
              )}
              <input
                type="text"
                name="content"
                className="form-control my-2 w-100"
                placeholder="content"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.content && formik.touched.content ? (
                <p className="fw-bold text-warning text-start fs-small">
                  {formik.errors.content}
                </p>
              ) : (
                ""
              )}

              <button type="submit" className="btn btn-primary w-100">
                Add Note
              </button>
            </form>
          </div>
        </div>
        <button
          onClick={logout}
          className="my-2 btn btn-danger text-white w-100"
        >
          Logout
        </button>
      </div>
    </>
  );
}
