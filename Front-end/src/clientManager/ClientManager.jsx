import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormControl, Row, Col,
} from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import axios from "axios";
import { roles } from "../data/data";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function EmployeeManager() {
  const [filterRole, setFilterRole] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/admin/get/CUSTOMER",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setData(res.data.responseList.CUSTOMER_list);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilterRole(selectedValue);
  };

  const handleEdit = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      id: selectedUser.id,
      role: form.role.value,
      email: form.gmail.value,
      phone: form.phone.value,
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

    const newData = data.map((item) => (item.id === values.id ? values : item));
    setData(newData);
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleAddClick = () => {
    setIsAddModalVisible(true);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newEmployee = {
      id: `ID_${data.length + 1}`,
      role: form.role.value,
      email: form.gmail.value,
      phone: form.phone.value,
      status: "active",
      userInfo: {
        id: `ID_${data.length + 1}`,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        birthDate: form.birthDate.value,
        gender: form.gender.value,
        phoneNumber: form.phone.value,
        address: form.address.value,
      },
    };
    setData([...data, newEmployee]);
    setIsAddModalVisible(false);
  };

  const handleDeleteClick = (record) => {
    setDeleteUser(record);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    const newData = data.filter((item) => item.id !== deleteUser.id);
    setData(newData);
    setDeleteModalVisible(false);
    setDeleteUser(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setDeleteUser(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = filterRole
    ? data.filter(
        (item) => item.role.toLowerCase() === filterRole.toLowerCase()
      )
    : data;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  return (
    <div style={{ padding: "3%" }}>
      <style jsx>{`
        .add-employee-button {
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
        .add-employee-button:hover {
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
      <p style={{ margin: 0, fontSize: 24, fontWeight: "bold" }}>Welcome, K!</p>
      <p style={{ fontSize: 16 }}>Employee Manager</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "2%",
        }}
      >
        <div className="rounded-lg bg-neutral-500 text-white pl-3 flex items-center">
          <div>Role Filter</div>
          <select className="bg-neutral-500 inline-block text-orange-500 w-44">
            {roles.map((role) => (
              <option className="bg-white text-black">{role.name} </option>
            ))}
          </select>
          <div className="relative right-6 pb-2">
          <Icon  icon="fa:sort-down" />
          </div>
        </div>
        
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Button
            variant="secondary"
            className="add-employee-button"
            onClick={handleAddClick}
          >
            <FiPlus color="rgba(224, 215, 234, 1)" />
            Add Employee
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
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.role}</td>
              <td>
                {item.userInfo.firstName} {item.userInfo.lastName}
              </td>
              <td>{item.email}</td>
              <td>{item.userInfo.phoneNumber}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === "ACTIVE" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td>
                <Button variant="link" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <span style={{ margin: "0 5px" }}>|</span>
                <Button variant="link" onClick={() => handleDeleteClick(item)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={styles.paginationContainer}>
        <div
          style={{
            ...styles.paginationButton,
            ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
          }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </div>
        {[...Array(totalPages).keys()].map((page) => (
          <div
            key={page + 1}
            style={{
              ...styles.paginationButton,
              ...(page + 1 === currentPage
                ? styles.paginationButtonActive
                : {}),
            }}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </div>
        ))}
        <div
          style={{
            ...styles.paginationButton,
            ...(currentPage === totalPages
              ? styles.paginationButtonDisabled
              : {}),
          }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </div>
      </div>

      <Modal show={isModalVisible} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={handleSave}>
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <FormControl
                  type="text"
                  defaultValue={selectedUser.id}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <FormControl type="text" defaultValue={selectedUser.role} />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <FormControl
                      type="text"
                      defaultValue={selectedUser.userInfo.firstName}
                      name="firstName"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <FormControl
                      type="text"
                      defaultValue={selectedUser.userInfo.lastName}
                      name="lastName"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Gmail</Form.Label>
                <FormControl type="email" defaultValue={selectedUser.email} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <FormControl
                  type="text"
                  defaultValue={selectedUser.userInfo.phoneNumber}
                  name="phone"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birth Date</Form.Label>
                <FormControl
                  type="date"
                  defaultValue={selectedUser.userInfo.birthDate}
                  name="birthDate"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <FormControl
                  as="select"
                  defaultValue={selectedUser.userInfo.gender}
                  name="gender"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="NON_BINARY">Non-binary</option>
                  <option value="OTHER">Other</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <FormControl
                  type="text"
                  defaultValue={selectedUser.userInfo.address}
                  name="address"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save changes
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                style={{ marginLeft: 8 }}
              >
                Back
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={deleteModalVisible} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this employee?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={isAddModalVisible}
        onHide={() => setIsAddModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdd}>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <FormControl type="text" name="role" required />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <FormControl type="text" name="firstName" required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <FormControl type="text" name="lastName" required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formGmail">
              <Form.Label>Gmail</Form.Label>
              <FormControl type="email" name="gmail" required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <FormControl type="text" name="phone" required />
            </Form.Group>
            <Form.Group controlId="formBirthDate">
              <Form.Label>Birth Date</Form.Label>
              <FormControl type="date" name="birthDate" required />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <FormControl as="select" name="gender" required>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="NON_BINARY">Non-binary</option>
                <option value="OTHER">Other</option>
              </FormControl>
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <FormControl type="text" name="address" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Employee
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsAddModalVisible(false)}
              style={{ marginLeft: 8 }}
            >
              Back
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
