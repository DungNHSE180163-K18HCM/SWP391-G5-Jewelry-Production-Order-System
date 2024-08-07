import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { roles } from "../data/Roles";
import ServerUrl from "../reusable/ServerUrl";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../provider/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { useAlert } from "../provider/AlertProvider";

export default function CustomersManager() {
  const {showAlert} = useAlert();
  const { token } = useAuth();
  const decodedToken = jwtDecode(token);

  const [filterRole, setFilterRole] = useState("CUSTOMER");
  const [sort, setSort] = useState("dateCreated");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isUpdated, setIsUpdated] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isUpdated || currentPage || filterRole) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `${ServerUrl}/api/account/${currentPage - 1}?role=${filterRole}&sort-by=${sort}`,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          if (res.status === 200) {
            setData(res.data.responseList.accounts);
            setTotalPages(res.data.responseList.totalPages);
            setIsUpdated(false);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [filterRole, currentPage, sort, isUpdated]);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilterRole(selectedValue);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleEdit = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      id: selectedUser.id,
      role: form.role.value,
      email: form.gmail.value,
      password: form.password.value,
      status: selectedUser.status,
      userInfo: {
        id: selectedUser.userInfo.id,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        birthDate: form.birthDate.value,
        gender: form.gender.value,
        phoneNumber: form.phone.value,
        address: form.address.value,
      },
    };

    try {
      const res = await axios.put(
        `${ServerUrl}/api/account/`,
        values  ,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Update Response:", res.data);
      if (res.data.statusCode === 200) {
        showAlert(
            "Edited successfully",
            "Edited " + selectedUser.id + " successfully",
            "success"
        );
        setIsUpdated(true);
        setIsModalVisible(false);
        setSelectedUser(null);
      }
      if (res.data.statusCode === 400){
        showAlert(
            res.data.message.toString(),
            "",
            "warning"
        );
      }
    } catch (err) {
      showAlert(
          "Edit failed",
          "Edit " + selectedUser.id + " failed",
          "danger"
      );
      console.error("Error updating account:", err);
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newEmployee = {
      role: "CUSTOMER",
      email: form.gmail.value,
      password: form.password.value,
      status: "ACTIVE ",
      userInfo: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        birthDate: form.birthDate.value,
        gender: form.gender.value,
        phoneNumber: form.phone.value,
        address: form.address.value,
      },
    };

    try {
      const res = await axios.post(
        `${ServerUrl}/api/account/`,
        newEmployee,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200) {
        showAlert(
            "Added successfully",
            "Added " + res.data.responseList.account.id + " successfully",
            "success"
        );
        setIsUpdated(true);
        setIsAddModalVisible(false);
      }
      if (res.status === 400){
        showAlert(
            res.data.message,
            "",
            "warning"
        );
      }
    } catch (err) {
      showAlert(
          "Add failed",
          "",
          "danger"
      );
      console.error("Error adding account:", err);
    } finally {
    }
  };

  const handleAddClick = () => {
    setIsAddModalVisible(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteUser(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await axios.delete(
        `${ServerUrl}/api/account/${deleteUser}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Delete Response:", res.data);
      if (res.status === 200) {
        showAlert(
            "Deleted successfully",
            "Deleted " + deleteUser + " successfully",
            "success"
        );
        setIsUpdated(true);
      }
    } catch (err) {
      showAlert(
          "Delete failed",
          "Delete " + deleteUser + " failed",
          "danger"
      );
      console.log("Error deleting account:", err);
    } finally {
      setDeleteModalVisible(false);
      setDeleteUser(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setDeleteUser(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const styles = {
    paginationContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: "20px",
    },
    paginationButton: {
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 5px",
      border: "1px solid #ddd",
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
    },
    paginationButtonActive: {
      backgroundColor: "#6c757d",
      color: "#fff",
    },
    paginationButtonDisabled: {
      backgroundColor: "#e9ecef",
      color: "#6c757d",
      cursor: "not-allowed",
    },
  };

  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div style={{ padding: "3%" }}>
      <style jsx>{`
        .add-client-button {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          background-color: #6c757d;
          border: none;
          color: #e0d7ea;
          padding: 8px 16px;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .add-client-button:hover {
          background-color: #007bff;
        }
        .role-filter-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 10px;
          background-color: rgba(101, 101, 101, 1);
          color: white;
          font-size: 20px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          position: relative;
          transition: background-color 0.3s;
        }
        .role-filter-button:hover {
          background-color: #007bff;
        }
        .role-filter-select {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        .role-filter-caret {
          margin-left: auto;
        }
      `}</style>

      <div className="mb-2">
        <p style={{ margin: 0, fontSize: 24, fontWeight: "bold" }}>
          Welcome, {decodedToken.first_name}!
        </p>
        <p style={{ fontSize: 18 }}>Customer Management</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <div className="w-100 d-flex justify-content-end">
          <Button variant="primary" onClick={handleAddClick}>
            <FiPlus />
            <span className="ms-1">Add Customer</span>
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.role}</td>
              <td>
                {item.userInfo?.firstName} {item.userInfo?.lastName}
              </td>
              <td>{item.email}</td>
              <td>{item.userInfo?.phoneNumber}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === "ACTIVE" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="d-flex justify-content-center gap-2">
                <Button
                  className="border-0"
                  variant="link"
                  onClick={() => handleEdit(item)}
                >
                  <FaEdit size={20} />
                </Button>
                <Button
                  className="border-0"
                  variant="link"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  <FaTrash size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={styles.paginationContainer}>
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          style={{
            ...styles.paginationButton,
            ...(currentPage === 1 && styles.paginationButtonDisabled),
          }}
          disabled={currentPage === 1}
        >
          &lt;
        </div>
        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              ...styles.paginationButton,
              ...(currentPage === index + 1 && styles.paginationButtonActive),
            }}
          >
            {index + 1}
          </div>
        ))}
        <div
          onClick={() => handlePageChange(currentPage + 1)}
          style={{
            ...styles.paginationButton,
            ...(currentPage === totalPages && styles.paginationButtonDisabled),
          }}
          disabled={currentPage === totalPages}
        >
          &gt;
        </div>
      </div>

      <Modal show={isModalVisible} onHide={handleCancel} centered>
        <Modal.Header>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={handleSave}>
              <Form.Group controlId="role" className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={selectedUser.role}
                  required
                  disabled
                >
                  <option value="CUSTOMER">CUSTOMER</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="gmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    defaultValue={selectedUser.email}
                    required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>
                  Password
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                      type="text"
                      name="password"
                      pattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"}
                      placeholder={"Change password as needed. . ."}
                      defaultValue={""}
                  />
                </Col>
                <div style={{
                  display: 'block',
                  marginTop: '5px',
                  fontSize: '12px',
                  color: '#6c757d',
                  lineHeight: '1.5'
                }}>
                  <ul>
                    <li>Password must be at least 8 characters long.</li>
                    <li>Include at least one uppercase letter.</li>
                    <li>Include at least one lowercase letter.</li>
                    <li>Include at least one numeric character.</li>
                  </ul>
                </div>
              </Form.Group>

              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedUser.userInfo.firstName}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedUser.userInfo.lastName}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.userInfo.phoneNumber}
                  required
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="birthDate" className="mb-3">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={formatDate(selectedUser.userInfo.birthDate)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="gender" className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={selectedUser.userInfo.gender}
                      required
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="address" className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.userInfo.address}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  className="mt-3"
                >
                  Back
                </Button>
                <Button variant="primary" type="submit" className="mt-3">
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={isAddModalVisible}
        onHide={() => setIsAddModalVisible(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdd}>
            {/* Hiển thị trường Role với CUSTOMER mặc định và disabled */}
            <Form.Group controlId="role" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" defaultValue="CUSTOMER" disabled>
                <option value="CUSTOMER">CUSTOMER</option>
              </Form.Control>
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="gmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>
                Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                    type="text"
                    name="password"
                    pattern={"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"}
                    required
                />
              </Col>
              <div style={{
                display: 'block',
                marginTop: '5px',
                fontSize: '12px',
                color: '#6c757d',
                lineHeight: '1.5'
              }}>
                <ul>
                  <li>Password must be at least 8 characters long.</li>
                  <li>Include at least one uppercase letter.</li>
                  <li>Include at least one lowercase letter.</li>
                  <li>Include at least one numeric character.</li>
                </ul>
              </div>
            </Form.Group>

            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" required/>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="birthDate" className="mb-3">
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control type="date" required/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="gender" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" required>
                  <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => setIsAddModalVisible(false)}
                className="mt-2"
              >
                Back
              </Button>
              <Button variant="primary" type="submit" className="mt-2">
                Add Customer
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={deleteModalVisible} onHide={handleCancelDelete} centered>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this client?</p>
          <div className="d-flex justify-content-around">
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              className="ms-2"
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
