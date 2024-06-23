import React, { useState } from "react";
import { Table, Button, Badge, Container, Row, Col, Pagination } from "react-bootstrap";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import { LiaUser } from "react-icons/lia";
import LineChartComponent from "../chart/LineChart";

export default function DashboardManager() {
  const [currentPageClients, setCurrentPageClients] = useState(1);
  const [currentPageOrders, setCurrentPageOrders] = useState(1);
  const itemsPerPage = 3;

  const columnsClient = [
    {
      title: <span style={{ fontSize: 18, fontWeight: 400 }}>Id</span>,
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 18, fontWeight: 400 }}>Name</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span style={{ fontSize: 18, fontWeight: 400 }}>Gmail</span>,
      dataIndex: "gmail",
      key: "gmail",
    },
    {
      title: <span style={{ fontSize: 18, fontWeight: 400 }}>Phone</span>,
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: <span style={{ fontSize: 18, fontWeight: 400 }}>Status</span>,
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Badge bg={status === "active" ? "success" : "danger"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      ),
    },
    {
      title: <span style={{ fontSize: 18, fontWeight: 400 }}>Action</span>,
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Button variant="link" style={{ padding: 0, margin: 0 }}>
            Edit
          </Button>
          <span style={{ margin: "0 8px" }}>|</span>
          <Button variant="link" style={{ padding: 0, margin: 0 }}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const dataClient = [
    {
      id: "CL_0001",
      name: "John Brown",
      phone: "01234556",
      gmail: "New York No. 1 Lake Park",
      status: "active",
    },
    {
      id: "CL_0002",
      name: "Jim Green",
      phone: "01234556",
      gmail: "London No. 1 Lake Park",
      status: "inactive",
    },
    {
      id: "CL_0003",
      name: "Joe Black",
      phone: "01234556",
      gmail: "Sydney No. 1 Lake Park",
      status: "active",
    },
    {
      id: "CL_0004",
      name: "John Brown",
      phone: "01234556",
      gmail: "New York No. 1 Lake Park",
      status: "active",
    },
    {
      id: "CL_0005",
      name: "Jim Green",
      phone: "01234556",
      gmail: "London No. 1 Lake Park",
      status: "inactive",
    },
    {
      id: "CL_0006",
      name: "Joe Black",
      phone: "01234556",
      gmail: "Sydney No. 1 Lake Park",
      status: "active",
    },
    {
      id: "CL_0007",
      name: "John Brown",
      phone: "01234556",
      gmail: "New York No. 1 Lake Park",
      status: "active",
    },
    {
      id: "CL_0008",
      name: "Jim Green",
      phone: "01234556",
      gmail: "London No. 1 Lake Park",
      status: "inactive",
    },
    {
      id: "CL_0009",
      name: "Joe Black",
      phone: "01234556",
      gmail: "Sydney No. 1 Lake Park",
      status: "active",
    },
  ];

  const columnsOrder = [
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>OrderID</span>,
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>CustomerID</span>,
      dataIndex: "customerID",
      key: "customerID",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Date</span>,
      dataIndex: "date",
      key: "date",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Total</span>,
      key: "total",
      dataIndex: "total",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Status</span>,
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Badge bg={status === "paid" ? "success" : "danger"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      ),
    },
  ];

  const dataOrder = [
    {
      orderId: "ID_0001",
      customerID: "CL_0009",
      date: "11/6/1994",
      total: "$1200",
      status: "unpaid",
    },
    {
      orderId: "ID_0001",
      customerID: "CL_0009",
      date: "11/6/1994",
      total: "$1200",
      status: "paid",
    },
    {
      orderId: "ID_0001",
      customerID: "CL_0009",
      date: "11/6/1994",
      total: "$1200",
      status: "unpaid",
    },
    {
      orderId: "ID_0001",
      customerID: "CL_0009",
      date: "11/6/1994",
      total: "$1200",
      status: "paid",
    },
    {
      orderId: "ID_0001",
      customerID: "CL_0009",
      date: "11/6/1994",
      total: "$1200",
      status: "unpaid",
    },
  ];

  const totalPagesClient = Math.ceil(dataClient.length / itemsPerPage);
  const totalPagesOrder = Math.ceil(dataOrder.length / itemsPerPage);

  const paginatedDataClient = dataClient.slice(
    (currentPageClients - 1) * itemsPerPage,
    currentPageClients * itemsPerPage
  );

  const paginatedDataOrder = dataOrder.slice(
    (currentPageOrders - 1) * itemsPerPage,
    currentPageOrders * itemsPerPage
  );

  return (
    <Container fluid style={{ padding: "3%" }}>
      <style>
        {`
          .pagination-circle .page-link {
            border-radius: 50% !important;
            margin: 0 4px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .pagination-circle .page-item.active .page-link {
            background-color: #6c757d;
            border-color: #6c757d;
            color: white;
          }

          .pagination-circle .page-item .page-link {
            color: #6c757d;
          }

          .pagination-circle .page-link:hover {
            background-color: #6c757d;
            color: white;
          }

          .pagination-circle .page-link:focus {
            box-shadow: none;
          }
        `}
      </style>
      <p style={{ margin: 0, fontSize: 24 }} className="fw-bolder">
        Welcome, K!
      </p>
      <p style={{ fontSize: 16 }}>Dashboard</p>
      <Row style={{ marginBottom: "1%" }}>
        <Col md={3}>
          <div
            style={{
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.15)",
              borderStyle: "solid",
              borderRadius: 5,
              padding: "12px 12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                borderRadius: 5,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(229, 229, 229, 1)",
              }}
            >
              <HiOutlineUserGroup size={24} color="rgba(163, 163, 163, 1)" />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <p style={{ margin: 0, fontSize: 17, fontWeight: 400 }}>Client</p>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>126</p>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div
            style={{
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.15)",
              borderStyle: "solid",
              borderRadius: 5,
              padding: "12px 12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                borderRadius: 5,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(229, 229, 229, 1)",
              }}
            >
              <LiaUser size={24} color="rgba(163, 163, 163, 1)" />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <p style={{ margin: 0, fontSize: 17, fontWeight: 400 }}>
                Employees
              </p>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>18</p>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div
            style={{
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.15)",
              borderStyle: "solid",
              borderRadius: 5,
              padding: "12px 12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                borderRadius: 5,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(229, 229, 229, 1)",
              }}
            >
              <IoMdCart size={24} color="rgba(163, 163, 163, 1)" />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <p style={{ margin: 0, fontSize: 17, fontWeight: 400 }}>Orders</p>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>56</p>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div
            style={{
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.15)",
              borderStyle: "solid",
              borderRadius: 5,
              padding: "12px 12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                borderRadius: 5,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(229, 229, 229, 1)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 24,
                  color: "rgba(163, 163, 163, 1)",
                }}
              >
                $
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <p style={{ margin: 0, fontSize: 17, fontWeight: 400 }}>Revenue</p>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>125k</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1%" }}>
        <Col md={6}>
          <div
            style={{
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.15)",
              borderStyle: "solid",
              borderRadius: 5,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px 10px",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                margin: 0,
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              Revenue per month
            </h1>
            <div style={{ flex: 1 }}>
              <LineChartComponent />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div
            style={{
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.15)",
              borderStyle: "solid",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: "10px 10px",
            }}
          >
            <p style={{ margin: 0, fontSize: 20 }} className="fw-bolder">
              Orders
            </p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {columnsOrder.map((col) => (
                    <th key={col.key}>{col.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedDataOrder.map((row) => (
                  <tr key={row.orderId}>
                    <td>{row.orderId}</td>
                    <td>{row.customerID}</td>
                    <td>{row.date}</td>
                    <td>{row.total}</td>
                    <td>
                      <Badge bg={row.status === "paid" ? "success" : "danger"}>
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end">
              <Pagination className="pagination-circle">
                <Pagination.Prev
                  onClick={() => setCurrentPageOrders(currentPageOrders - 1)}
                  disabled={currentPageOrders === 1}
                />
                {[...Array(totalPagesOrder).keys()].map((page) => (
                  <Pagination.Item
                    key={page + 1}
                    active={page + 1 === currentPageOrders}
                    onClick={() => setCurrentPageOrders(page + 1)}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPageOrders(currentPageOrders + 1)}
                  disabled={currentPageOrders === totalPagesOrder}
                />
              </Pagination>
            </div>
          </div>
        </Col>
      </Row>
      <p style={{ margin: 0, fontSize: 20 }} className="fw-bolder">
        Clients
      </p>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columnsClient.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedDataClient.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.gmail}</td>
              <td>{row.phone}</td>
              <td>
                <Badge bg={row.status === "active" ? "success" : "danger"}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </Badge>
              </td>
              <td>
                <Button variant="link" style={{ padding: 0, margin: 0 }}>
                  Edit
                </Button>
                <span style={{ margin: "0 8px" }}>|</span>
                <Button variant="link" style={{ padding: 0, margin: 0 }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Pagination className="pagination-circle">
          <Pagination.Prev
            onClick={() => setCurrentPageClients(currentPageClients - 1)}
            disabled={currentPageClients === 1}
          />
          {[...Array(totalPagesClient).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPageClients}
              onClick={() => setCurrentPageClients(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPageClients(currentPageClients + 1)}
            disabled={currentPageClients === totalPagesClient}
          />
        </Pagination>
      </div>
    </Container>
  );
}
