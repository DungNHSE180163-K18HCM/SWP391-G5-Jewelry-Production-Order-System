import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Snowfall from "../assets/snowfall.jpg";
import { Container } from "react-bootstrap";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function ImageRotator() {
  return (
    <Container className="p-3">
      <Carousel
        responsive={responsive}
        centerMode={false}
        draggable={false}
        swipeable={false}
        infinite={true}
        pauseOnHover
        autoPlaySpeed={3000}
        autoPlay={true}
        containerClass=" carousel-container"
      >
        <div className="card text-center" style={{margin: "0px 5px"}}>
          <img className="product--image" src={Snowfall} alt="product " />
          <h3>Placeholder</h3>
        </div>
        <div className="card text-center " style={{margin: "0px 5px"}}>
          <img className="product--image" src={Snowfall} alt="product " />
          <h3>Placeholder</h3>
        </div>
        <div className="card text-center " style={{margin: "0px 5px"}}>
          <img className="product--image" src={Snowfall} alt="product " />
          <h3>Placeholder</h3>
        </div>
        <div className="card text-center " style={{margin: "0px 5px"}}>
          <img className="product--image" src={Snowfall} alt="product " />
          <h3>Placeholder</h3>
        </div>
        <div className="card text-center " style={{margin: "0px 5px"}}>
          <img className="product--image" src={Snowfall} alt="product " />
          <h3>Placeholder</h3>
        </div>
      </Carousel>
    </Container>
  );
}
