import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Carousel from "../components/Carousel";
import ImageRotator from "../components/ImageRotator";
import Ring from "../assets/ring-banner.jpg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import AndieNecklace from "../assets/andie-gomez-acebo-sEq4onJnWrI-unsplash.jpg";
import SabriannaRing from "../assets/sabrianna-uiKSc7-NM2s-unsplash.jpg";
import { useState } from "react";
import Snowfall from "../assets/snowfall.jpg";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiCustomerServiceLine } from "react-icons/ri";
import { MdOutlineCleaningServices } from "react-icons/md";
import { Link } from "react-router-dom";

const HoverDiv = ({ children }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: isHover ? "1" : "0.5",
        filter: isHover ? "brightness(50%)" : "brightness(85%)",
        position: "relative",
        textAlign: "center",
        cursor: "pointer",
        transition: "filter 0.5s linear",
      }}
    >
      {children}
    </div>
  );
};

function Home() {
  const blogImageStyle = {
    objectFit: "cover",
    padding: "10px",
  };

  return (
    <>
      <div className="carousel-banner mb-3">
        <Carousel />
      </div>

      <div className="product-rotator pb-4 pt-4 mb-3">
        <div className="collection-title pt-4 pb-4">
          <h2 className="fw-bold text-center">Our Latest Products</h2>
        </div>
        <ImageRotator />
      </div>

      <Container
        fluid
        className="introduction-article d-flex justify-content-center pb-4 pt-4 mb-3"
      >
        <div>
          <Row className="introduction-quotes">
            <Col md={6}>
              <div className="pb-4 pt-4">
                <h3 className="fw-bold">
                  We Here To Help You Make Your Dream Jewelry.
                </h3>
              </div>
              <div className="pb-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <Link to="/order_page">
                <Button
                  variant="outline-dark fw-bold"
                  className="mt-2 mb-2"
                  style={{
                    width: "150px",
                    borderRadius: "22px",
                    height: "40px",
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col md={6}>
              <img
                src={Ring}
                alt="Ring Background"
                width="100%"
                height="100%"
              />
            </Col>
          </Row>
        </div>
      </Container>

      <Container fluid className="pt-4 pb-4 mb-3">
        <div>
          <Row>
            <Col md={6}>
              <Link to="/order_page">
                <div className="mb-2 mt-2" style={{ position: "relative" }}>
                  <HoverDiv>
                    <img
                      src={AndieNecklace}
                      alt="A Woman Wearing A Necklace"
                      width="100%"
                      height="100%"
                    />
                  </HoverDiv>
                  <div
                    style={{
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                      left: "50%",
                    }}
                  >
                    <h2 className="fw-bold text-white">Custom Your Own</h2>
                  </div>
                </div>
              </Link>
            </Col>
            <Col md={6}>
              <Link to="/collections_page">
                <div className="mb-2 mt-2" style={{ position: "relative" }}>
                  <HoverDiv>
                    <img
                      src={SabriannaRing}
                      alt="Ruby Ring"
                      width="100%"
                      height="100%"
                    />
                  </HoverDiv>

                  <div
                    style={{
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                      left: "50%",
                    }}
                  >
                    <h2 className="fw-bold text-white">
                      Use Available Templates
                    </h2>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>

      <div className=" pb-4 pt-4 mb-3" style={{ backgroundColor: "#e5e5e5" }}>
        <Container>
          <div className="text-center pt-4 pb-4">
            <h2 className="fw-bold">Our Features</h2>
          </div>
          <Row>
            <Col className="text-center">
              <div className="mb-3">
                <LiaShippingFastSolid size="50px" />
              </div>
              <h5>Complimentary Shipping & Returns</h5>
              <p>
                We offer complimentary shipping and returns on orders above 2000
                AED
              </p>
            </Col>
            <Col className="text-center">
              <div className="mb-3">
                <RiCustomerServiceLine size="50px" />
              </div>
              <h5>Always At Your Service</h5>
              <p>Our staffs are always here to help.</p>
            </Col>
            <Col className="text-center">
              <div className="mb-3">
                <MdOutlineCleaningServices size="50px" />
              </div>
              <h5>Clean Your Jewelry</h5>
              <p>We guarantee to clean your jewelry for a year</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid className="pb-4 pt-4 mb-3">
        <div className="text-center pt-4 pb-4">
          <h2 className="fw-bold">Newest Blogs</h2>
        </div>
        <Row>
          <Col md={3}>
            <Card className="mb-2 mt-2" style={{ cursor: "pointer" }}>
              <Card.Img
                src={Snowfall}
                variant="top"
                width="100%"
                height="380px"
                style={blogImageStyle}
              />
              <Card.Body>
                <div className="pb-3">
                  <Card.Title>
                    <h4 className="fw-bold">Clean Your Jewelry</h4>
                  </Card.Title>
                  <Card.Subtitle>
                    <p>Learn how to clean your jewelry at home</p>
                  </Card.Subtitle>
                </div>
                <Card.Link>
                  <Button>Read now</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-2 mt-2" style={{ cursor: "pointer" }}>
              <Card.Img
                src={Snowfall}
                variant="top"
                width="100%"
                height="380px"
                style={blogImageStyle}
              />
              <Card.Body>
                <div className="pb-3">
                  <Card.Title>
                    <h4 className="fw-bold">Clean Your Jewelry</h4>
                  </Card.Title>
                  <Card.Subtitle>
                    <p>Learn how to clean your jewelry at home</p>
                  </Card.Subtitle>
                </div>
                <Button>Read now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-2 mt-2" style={{ cursor: "pointer" }}>
              <Card.Img
                src={Snowfall}
                variant="top"
                width="100%"
                height="380px"
                style={blogImageStyle}
              />
              <Card.Body>
                <div className="pb-3">
                  <Card.Title>
                    <h4 className="fw-bold">Clean Your Jewelry</h4>
                  </Card.Title>
                  <Card.Subtitle>
                    <p>Learn how to clean your jewelry at home</p>
                  </Card.Subtitle>
                </div>
                <Button>Read now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-2 mt-2" style={{ cursor: "pointer" }}>
              <Card.Img
                src={Snowfall}
                width="100%"
                height="380px"
                style={blogImageStyle}
              />
              <Card.Body>
                <div className="pb-3">
                  <Card.Title>
                    <h4 className="fw-bold">Clean Your Jewelry</h4>
                  </Card.Title>
                  <Card.Subtitle>
                    <p>Learn how to clean your jewelry at home</p>
                  </Card.Subtitle>
                </div>
                <Button>Read now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Home;
