import React, { useState, useEffect } from "react";
import moment from "moment";
import { message } from 'antd';

import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../config";

const Products = () => {
  const [product, setProduct] = useState();
  console.log(product);
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [descriptions, setDescription] = useState("");
  const [status_s, setStatus] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [deletedsucess, setDeletedSucess] = useState("");

  const [search, setSearch] = useState("");

  // const [validateError,setValidateError]=useState()


  const handlesubmit = (event) => {
    event.preventDefault();

    

    axios
      .post("/api/v1/products", {
        product_name: productName,
        category_name: categoryName,
        created_by: createdBy,
        description: descriptions,
        status: status_s,
      })
      .then((msg) => setSucess("Successfully Added"), setError(""))
      .catch((err) => setError(err.response.data.message), setSucess(""));
     

  };

  const getproducts = () => {
    axios
      .get('api/v1/products')
      .then((data) => {
        if (data.data.status === "SUCCESS") {
          setProduct(data.data.data.getAllProd);
          // setSucess("Sucessfully added")
        }
      })

      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getproducts();
  }, [sucess, error, deletedsucess]);

  const getfilteredProduct=()=>{
    //http://localhost:5000/api/v1/products?sort=-product_name&fields=product_name&page=3&limit=1


  }

  const deleteproduct = (_id) => {
    // event.preventDefault()

    axios
      .delete(`/api/v1/products/${_id}`)
      .then(() => setDeletedSucess("Successfully deleted"), setError(""))
      .catch((err) => setError(""), setDeletedSucess(""));
  };

  useEffect(() => {
    deleteproduct();
  }, []);

  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    } else {
      return (
        <div className="alert alert-danger" style={{ display: "none" }}></div>
      );
    }
    // return <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>{error}</div>
  };

  const showSuccess = () => {
    if (sucess) {
      return (
        <div className="alert alert-success">
          New Product added successfully.
        </div>
      );
    }
  };

  const showdeletedSuccess = () => {
    if (deletedsucess) {
      return (
        <div className="alert alert-success">
           Product deleted successfully
        </div>
      );
    }
  };

  return (
    <>
     
      {showdeletedSuccess()}

      {/* Modal for Add products */}
      <div class="row">
        <div class="col-md-4">
          <div style={{ marginTop: "50px" }}>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              Add New Product
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      New Product
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  {showSuccess()}
                  {showError()}
                  <div class="modal-body">
                    <form  
>
                      <div class="mb-3">
                        <label for="name" class="col-form-label">
                          Product Name:
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setProductName(e.target.value)}
                          class="form-control"
                          id="name"
                        />
                        {/* {validateError?
                      <div style={{color:"red"}}>Product Name Must be in alphabhaets Characters</div>:" " 
                      } */}
                      </div>
                      <div class="mb-3">
                        <label for="category" class="col-form-label">
                          Category:
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setCategoryName(e.target.value)}
                          class="form-control"
                          id="category"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="createdBy" class="col-form-label">
                          Created By:
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setCreatedBy(e.target.value)}
                          class="form-control"
                          id="createdBy"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="desc" class="col-form-label">
                          Description
                        </label>
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          class="form-control"
                          id="desc"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="status" class="col-form-label">
                          Status
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setStatus(e.target.value)}
                          class="form-control"
                          id="status"
                        />
                         <div style={{fontStyle:"italic"}}>Input fields for status are ('in stock' &  'out off stock'):</div>

                      </div>
                      <div></div>
    
                      <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                       onClick={handlesubmit}
                      class="btn btn-primary"
                    >
                      Add Product
                    </button>
                  </div>

                    </form>

                  </div>
                  {/* <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                       onClick={handlesubmit}
                      class="btn btn-primary"
                    >
                      Add Product
                    </button>
                  </div> */}

                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5"></div>
        <div class="col-md-3">
          <div style={{ marginTop: "50px" }}>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              placeholder="Search Here"
            />
          </div>
        </div>
      </div>

      <div style={{ margin: "10rem" }}>
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
            {product && product.length > 0
              ? product
                  .filter(
                    (prod) =>
                      prod.product_name.toLowerCase().includes(search) ||
                      prod.category_name.toLowerCase().includes(search) ||
                      prod.description.toLowerCase().includes(search) ||
                      prod.created_by.toLowerCase().includes(search) ||
                      prod.status.toLowerCase().includes(search)
                  )
                  .map((item, i) => {
                    return (
                      <tr>
                        <td>{item.product_name}</td>
                        <td>{item.category_name}</td>
                        <td>{item.description}</td>
                        <td>{item.created_by}</td>
                        <td>{item.status}</td>
                        <td>
                          {/* {dayjs(item.createdAt).fromNow()} */}
                          {moment(item.createdAt).format("YYYY/MM/DD")}
                        </td>
                        <td>
                          <button
                            class="btn btn-primary"
                            onClick={() => deleteproduct(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <Link to={`update/${item._id}`}>
                            <button class="btn btn-primary">Edit</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
              : "No data available"}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
