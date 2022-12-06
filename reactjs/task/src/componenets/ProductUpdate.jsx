import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import { useState, useEffect } from "react";

const ProductUpdate = () => {
  const params = useParams();
  const [oldproduct, setOldProduct] = useState("");
  console.log("oLdProduct", oldproduct);
  const [oldcategory, setOldCategory] = useState("");
  const [oldCreatedBy, setOldCreatedBy] = useState("");
  const [oldDescription,setOldDescription]=useState("")
  const [oldStatus,setOldStatus]=useState("")
  const [oldCreatedAt,setOldCreatedAt]=useState("")
  const [sucess, setSucess] = useState("");
  const [error, setError] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [createdByName,setCreatedByName]=useState("")
  const [descriptionName,setDescriptionName]=useState("")
  const [updatedStatus,setUpdatedStatus]=useState("")

  console.log("updatedName", updatedName);

  const navigate = useNavigate();

  const getproducts = () => {
    axios
      .get(`/api/v1/products/${params.id}`)
      .then((data) => {
        console.log("data", data);
        setOldProduct(data.data.data.getProd.product_name);
        setOldCategory(data.data.data.getProd.category_name);
        setOldCreatedBy(data.data.data.getProd.created_by);
        setOldDescription(data.data.data.getProd.description);
        setOldStatus(data.data.data.getProd.description);
        setOldCreatedAt(data.data.data.getProd.createdAt);

      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getproducts();
  }, []);

  const productUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/v1/products/${params.id}`, {
        product_name: updatedName,
        
      })
      .then(() => {
        setSucess("Successfully Updated");
        setError("");
        // navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSucess("");
      });
  };

  const categoryUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/v1/products/${params.id}`, {
        category_name: categoryName,
      })
      .then(() => {
        setSucess("Successfully Updated");
        setError("");
        // navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSucess("");
      });
  };

  const createdBy = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/v1/products/${params.id}`, {
        created_by: createdByName,
      })
      .then(() => {
        setSucess("Successfully Updated");
        setError("");
        // navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSucess("");
      });
  };

  const descriptionfxn = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/v1/products/${params.id}`, {
        description: descriptionName,
      })
      .then(() => {
        setSucess("Successfully Updated");
        setError("");
        // navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSucess("");
      });
  };

  const statusfxn = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/v1/products/${params.id}`, {
        status: updatedStatus,
      })
      .then(() => {
        setSucess("Successfully Updated");
        setError("");
        // navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSucess("");
      });
  };


  const showSuccess = () => {
    //
    if (sucess) {
      return (
        <div className="alert alert-success"> Updated successfully.</div>
      );
    }
  };

  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    } else {
      return (
        <div className="alert alert-danger" style={{ display: "none" }}></div>
      );
    }
  };

  return (
    <div>
      {showSuccess()}
      {showError()}
      {/* Client Stuff:{JSON.stringify(params)} */}
      

      <div className="container mt-3">
        <div style={{display:"flex",flexDirection:"column-reverse",flexWrap:"wrap"}}>
          <div >
            <div style={{ margin: "10rem" }}>
              <div style={{fontStyle:"italic"}}>Previous Product:</div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Created By</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{oldproduct}</td>
                    <td>{oldcategory}</td>
                    <td>{oldDescription}</td>
                    <td>{oldCreatedBy}</td>
                    <td>{oldStatus}</td>
                    <td>{moment(oldCreatedAt).format("YYYY/MM/DD")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div >
          <div style={{fontStyle:"italic"}}>Updated the Product:</div>

            <form style={{ marginTop: "70px", marginLeft: "10px" }}>

              <div class="mb-3">
                <label for="exampleName" class="form-label me-3">
                  Product Name:
                </label>
                <input
                  type="text"
                  onChange={(e) => setUpdatedName(e.target.value)}
                  id="exampleName"
                  //  value={oldproduct}
                />

                <button
                  type="submit"
                  class="btn btn-primary ms-4"
                  onClick={productUpdate}
                >
                  Edit
                </button>
              </div>

              <div class="mb-3">
                <label for="examplecatg" class="form-label  me-3">
                  Category Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setCategoryName(e.target.value)}
                  id="examplecatg"
                />

                <button
                  type="submit"
                  class="btn btn-primary ms-4"
                  onClick={categoryUpdate}
                >
                  Edit
                </button>
              </div>

              <div class="mb-3">
                <label for="exampledesc" class="form-label  me-3">
                Description
                </label>
                <input
                  type="text"
                  onChange={(e) => setDescriptionName(e.target.value)}
                  id="exampledesc"
                />

                <button
                  type="submit"
                  class="btn btn-primary ms-4"
                  onClick={descriptionfxn}
                >
                  Edit
                </button>
              </div>

              <div class="mb-3">
                <label for="examplecreated" class="form-label  me-3">
                  Created By
                </label>
                <input
                  type="text"
                  onChange={(e) => setCreatedByName(e.target.value)}
                  id="examplecreated"
                />

                <button
                  type="submit"
                  class="btn btn-primary ms-4"
                  onClick={createdBy}
                >
                  Edit
                </button>
              </div>

              <div class="mb-3">
                <label for="examplestatus" class="form-label  me-3">
                  Status
                </label>
                <input
                  type="text"
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  id="examplestatus"
                />

                <button
                  type="submit"
                  class="btn btn-primary ms-4"
                  onClick={statusfxn}
                >
                  Edit
                </button>
              </div>
              <div style={{fontStyle:"italic"}}>Input fields for status are ('in stock' &  'out off stock'):</div>


              <Link to="/">
                <button class="btn btn-primary ms-2">Go to Home Page</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
