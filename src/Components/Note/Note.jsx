import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import * as yup from "yup";

export default function Note({ note, deleteNote }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   console.log(note);

  async function handleEdit(valuse) {
    let { data } = await axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        valuse,
        {
          headers: {
            token: `
            3b8ny__${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.msg,
        });
      });

    Swal.fire({
      icon: "success",
      title: "Note Added Successfully",
    });
    console.log(data);
  }

  const validationSchema = yup.object({
    title: yup
      .string()
      .required("title is required")
      .max(10, "max length is 10 chars")
      .min(3, "min length is 3 chars"),
    content: yup
      .string()
      .required("content is required")
      .max(10, "max length is 10 chars")
      .min(3, "min length is 3 chars"),
  });

  const formik = useFormik({
    initialValues: {
      title: note.title,
      content: note.content,
    },
    validationSchema,
    onSubmit: handleEdit,
  });

  return (
    <>
      {!note ? (
        <h2>No Notes Added</h2>
      ) : (
        <>
          <div className="col-md-4 text-dark p-2">
            <div className="note bg-success p-1">
              <p>{note.title}</p>
              <p>{note.content}</p>
              <i
                onClick={() => deleteNote(note._id)}
                className="fa-solid fa-trash me-3 cursor-pointer"
              ></i>
              <i
                onClick={handleShow}
                className="fa-solid fa-file-pen cursor-pointer"
              ></i>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <input
                  type="text"
                  name="title"
                  className="form-control my-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultValue={note.title}
                />
                {formik.errors.title && formik.touched.title ? (
                  <p className="text-danger text-start fs-small fw-bold">
                    {formik.errors.title}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  name="content"
                  className="form-control my-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultValue={note.content}
                />
                {formik.errors.content && formik.touched.content ? (
                  <p className="text-danger text-start fs-small fw-bold">
                    {formik.errors.content}
                  </p>
                ) : (
                  ""
                )}
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                  formik.handleSubmit();
                }}
              >
                Edit Note
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
