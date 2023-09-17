import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../utils/FirebaseConfig";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function CategoryModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [CategoryName, setCategoryName] = useState("");
  const [CategoryImage, setCategoryImage] = useState(null);

  const AddCategory = (e) => {
    e.preventDefault();
    if (!CategoryName || CategoryName.trim() === "") {
      console.log("Please enter a valid Category Name.");
      return;
    }
    if (!CategoryImage) {
      console.log("Please select a category image.");
      return;
    }

    const storageRef = ref(storage, `image/${CategoryImage.name}`);

    uploadBytes(storageRef, CategoryImage).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          const payload = { CategoryName, CategoryImage: url };
          axios
            .post(`http://localhost:8765/api/category/create-category`, payload)
            .then((json) => {
              setShow(false);
            })
            .catch((err) => alert(err.message));
          console.log(payload);
          handleClose();
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title> Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AddCategory}>
            <Form.Group className="mb-3" controlId="CategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                value={CategoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                type="text"
                placeholder="Enter Category Name"
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                onChange={(e) => setCategoryImage(e.target.files[0])}
                type="file"
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CategoryModal;
