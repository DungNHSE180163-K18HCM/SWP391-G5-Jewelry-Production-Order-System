import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import ServerUrl from "../reusable/ServerUrl";
import CreateRequest from "./CreateRequest";
import { ChainType, DesignStyle, JewelryType, Length, Occasion, Texture, GemstoneForm, MetalWeight, MetalForm } from "./DesignOptionForms";

function OrderPage1() {
  const [showModal, setShowModal] = useState(false);
  const [productSpecId, setProductSpecId] = useState(null);

  const handleMakeRequest = (productSpecId) => {
    setShowModal(true);
    setProductSpecId(productSpecId);
  }

  const handleRequestCanceled = (e) => {
    setShowModal(false);
    if (productSpecId) {
      axios
        .delete(`${ServerUrl}/api/products/customize/${productSpecId}`)
        .then((response) => {
          console.log("Product specification removed successfully");
        })
        .catch((error) => {
          console.error("Error removing product specification:", error);
        });
    }
  };

  return (
    <Container style={{ paddingInline: "10%" }}>
      <h3 className="fw-bold" style={{ margin: "30px 0px 30px" }}>
        Create Your Dream Jewelry.
      </h3>
      <RenderSpecificationForm handleMakeRequest={handleMakeRequest} />
      <Modal show={showModal} size="lg" backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Create Request</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{width: "100%"}}>
          <CreateRequest productSpecId={productSpecId} handleCancelRequest={handleRequestCanceled} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

const RenderSpecificationForm = ({handleSubmit, initialSpecs = null, handleMakeRequest}) => {
  const [gemstoneData, setGemstoneData] = useState({
    names: [],
    shapes: [],
    cuts: [],
    clarities: [],
    colors: [],
    minWeight: "",
    maxWeight: ""
  });
  const [formState, setFormState] = useState({
    selectedType: initialSpecs? initialSpecs.type :"",
    selectedStyle: initialSpecs? initialSpecs.style :"",
    selectedOccasion: initialSpecs? initialSpecs.occasion :"",
    selectedLength: initialSpecs? initialSpecs.length :"",
    selectedTexture: initialSpecs? initialSpecs.texture :"",
    selectedChainType: initialSpecs? initialSpecs.chainType :"",
    selectedGemstone: initialSpecs? initialSpecs.gemstone :null,
    selectedGemstoneWeight: initialSpecs? initialSpecs.gemstoneWeight :"",
  });
  const [selectedGemstoneProp, setSelectedGemstoneProp] = useState({
    selectedGemstoneName: initialSpecs?.gemstone? initialSpecs.gemstone.name: "",
    selectedGemstoneShape: initialSpecs?.gemstone? initialSpecs.gemstone.shape: "",
    selectedGemstoneCut: initialSpecs?.gemstone? initialSpecs.gemstone.cut: "",
    selectedGemstoneClarity: initialSpecs?.gemstone? initialSpecs.gemstone.clarity: "",
    selectedGemstoneColor: initialSpecs?.gemstone? initialSpecs.gemstone.color: "",
    selectedGemstoneWeight: initialSpecs? initialSpecs.gemstoneWeight: "",
    selectedGemstone: initialSpecs? initialSpecs.gemstone: null,
  });
  const [selectedMetalProp, setSelectedMetalProp] = useState({
    selectedMetalName: initialSpecs? initialSpecs.metal.name: "",
    selectedMetalUnit: initialSpecs? initialSpecs.metal.unit: "",
    selectedMetal: initialSpecs? initialSpecs.metal: null,
    selectedMetalWeight: initialSpecs? initialSpecs.metalWeight: "",
  });

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(`${ServerUrl}/api/gemstone/factors`);
        if (response.status === 200) {
          const data = response.data.responseList;
          setGemstoneData({
            names: data.names,
            shapes: data.shapes,
            cuts: data.cuts,
            clarities: data.clarities,
            colors: data.colors,
            minWeight: data.minWeight,
            maxWeight: data.maxWeight,
          });
        }
      } catch (error) {
        console.error("Error fetching gemstone and metal:", error);
      }
    };

    fetchPrice();
  }, []);

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
        selectedGemstoneType: null,
        selectedGemstoneShape: "",
        selectedGemstoneCut: "",
        selectedGemstoneClarity: "",
        selectedGemstoneColor: "",
        selectedGemstoneWeight: "0",
      }));

    switch (formState.selectedType) {
      case "Necklace":
        setFormState((prev) => ({ ...prev, selectedLength: "14", selectedTexture: "Default", selectedChainType: "Default" }));
        break;
      case "Bracelet":
        setFormState((prev) => ({ ...prev, selectedLength: "", selectedTexture: "Default", selectedChainType: "Default" }));
        break;
      case "Earrings":
        setFormState((prev) => ({ ...prev, selectedLength: "", selectedTexture: "Default", selectedChainType: "NaN" }));
        break;
      case "Anklet":
        setFormState((prev) => ({ ...prev, selectedLength: "0", selectedTexture: "Default", selectedChainType: "Default" }));
        break;
      case "Rings":
        setFormState((prev) => ({
          ...prev,
          selectedLength: "0.618",
          selectedTexture: "Default",
          selectedChainType: "NaN"
        }));
        break;
      default:
        setFormState((prev) => ({ ...prev, selectedLength: "0" }));
    }
  }, [formState.selectedType]);

  useEffect(() => {
    if (selectedMetalProp.selectedMetalName) {
      setFormState((prev) => ({
        ...prev,
        selectedChainType: ["Necklace", "Bracelet", "Anklet"].includes(formState.selectedType) ? "Default": "NaN",
        selectedTexture: "Default",
      }));
    }
  }, [selectedMetalProp.selectedMetalName, formState.selectedType]);

  const handleSubmitData = (e) => {
    e.preventDefault();
    const productSpecification = {
      type: formState.selectedType,
      style: formState.selectedStyle,
      occasion: formState.selectedOccasion,
      length: formState.selectedLength,
      metal: selectedMetalProp.selectedMetal,
      metalWeight: selectedMetalProp.selectedMetalWeight,
      texture: formState.selectedTexture,
      chainType: formState.selectedChainType,
      gemstone: selectedGemstoneProp.selectedGemstone,
      gemstoneWeight: selectedGemstoneProp.selectedGemstoneWeight
    };

    axios({
      method: "POST",
      url: `${ServerUrl}/api/products/customize`,
      headers: { "Content-Type": "application/json" },
      data: productSpecification,
    })
    .then((response) => {
      if (handleMakeRequest)
        handleMakeRequest(response.data.responseList.productSpecification.id);
    })
    .catch((error) => {
      console.log("There is an error in this code" + error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeGemstone = useCallback((e) => {
    const { name, value } = e.target;
    if (value === "") {
      setSelectedGemstoneProp((prev) => ({ ...prev, [name]: null }));
    } else {
      setSelectedGemstoneProp((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "selectedGemstoneName" && value === "" && !value) {
      setSelectedGemstoneProp({
        selectedGemstoneName: null,
        selectedGemstoneShape: "",
        selectedGemstoneCut: "",
        selectedGemstoneClarity: "",
        selectedGemstoneColor: "",
        selectedGemstoneWeight: "",
        selectedGemstone: null,
      });
    } else if (name === "selectedGemstoneName" && value) {
      setSelectedGemstoneProp({
        selectedGemstoneName: value,
        selectedGemstoneShape: "",
        selectedGemstoneCut: "",
        selectedGemstoneClarity: "",
        selectedGemstoneColor: "",
        selectedGemstoneWeight: "0.05",
        selectedGemstone: null,
      });
    } else if (name === "selectedGemstoneWeight" && value) {
      setSelectedGemstoneProp((prev) => ({
        ...prev,
        selectedGemstone: null,
      }))
    }
  }, []);

  const handleChangeMetal = useCallback((e) => {
    const { name, value } = e.target;
    setSelectedMetalProp((prev) => ({...prev, [name]: value}));
  }, []);

  const handleDisable = () => {
    const {
      selectedStyle,
      selectedOccasion,
      selectedType,
      selectedLength
    } = formState;

    const {
      selectedGemstoneName,
      selectedGemstone
    } = selectedGemstoneProp;

    const {
      selectedMetal,
      selectedMetalWeight,
    } = selectedMetalProp;

    return !(
      selectedStyle &&
      selectedOccasion &&
      selectedType &&
      selectedMetal &&
      selectedMetalWeight &&
      selectedMetalWeight > 0 &&
      selectedLength !== "0" &&
      selectedLength &&
      (!selectedGemstoneName || (selectedGemstoneName && selectedGemstone))
      // (selectedMetalName && selectedMetal)
    );
  };

  return (
    <Form onSubmit={handleSubmitData} className="mb-5">
      <Container>
        <Row>
          <Col sm={12} md={6} lg={4}>
            <JewelryType onChange={handleChange} value={formState.selectedType} />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <DesignStyle onChange={handleChange} value={formState.selectedStyle}/>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <Occasion onChange={handleChange} value={formState.selectedOccasion} />
          </Col>
        </Row>
      </Container>

      {/* Conditional Rendering Length */}
      {formState.selectedType && (
        <Length selectedType={formState.selectedType} selectedLength={formState.selectedLength} onChange={handleChange} />
      )}

      {/* Metal */}
      {formState.selectedType && (
        <>
          <MetalForm onChange={handleChangeMetal} selectedType={formState.selectedType} selectedMetalData={selectedMetalProp}/>

          {selectedMetalProp.selectedMetalName && (
            <Row>
              <Col sm={12} md={true}>
                <Texture onChange={handleChange} value={formState.selectedTexture} />
              </Col>
              {!["Rings", "Earrings"].includes(formState.selectedType) && (
                  <Col sm={12} md={6}>
                    <ChainType onChange={handleChange} value={formState.selectedChainType} />
                  </Col>
              )}
            </Row>
          )}
        </>
      )}

      {/* Gemstone */}
      {["Rings", "Necklace", "Earrings"].includes(formState.selectedType) && (
        <>
          <h5 className="pt-1">Gemstone</h5>
          <GemstoneForm gemstoneData={gemstoneData} onChange={handleChangeGemstone} selectedData={selectedGemstoneProp} />
        </>
      )}

      <div className="d-flex justify-content-center">
        <Button type="submit" disabled={handleDisable()} style={{width: "15ch"}}>Submit</Button>
      </div>
    </Form>
  )
}

export default OrderPage1;

export {
  RenderSpecificationForm
};