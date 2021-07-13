import React, { useRef, useState } from "react"
import { Form, Card, Button, Alert, Container, screenCapture } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom";
import Carousel2 from './Carousel2'
import Carousel1 from './Carousel1'
import '../components/Create.css';
import './images/L1.png';

export default function Create() {
  const [error, setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory()
  const saveRef = useRef()
  const { screenCapture } = useAuth()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await screenCapture(saveRef.current.value)
      setMessage("Here is your Image")
    } catch {
      setError("Failed to save")
    }

    setLoading(false)
  }
  async function startCapture(displayMediaOptions) {
    let captureStream = null;
  
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch(err) {
      console.error("Error: " + err);
    }
    return captureStream;
  }
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }


  function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    //     function takeShot() { 
    //       html2canvas(document.querySelector("#capture")).then(canvas => {
    //        document.querySelector("#output").appendChild(canvas)
    //    });
    // }

    return (
      <>
        <div>
        <Container
      className="d-flex justify-content-center"
    >
          {/* ----the code below imports the second carousel---- */}
          <Carousel2 />,
          </Container>
          <Container
      className="d-flex justify-content-center"
    >
            <Carousel1  />
            </Container>

          
      </div>
      </>
    );

  }



  return (
    <>
      {

      }
      <ControlledCarousel />


      {/* ----code below is the lightsaber word logo---- */}
      <h3 className="text-center mb-8 text-white">
        <div className="text-center mb-8 text-white">
          Design your own</div>
        <div className="text-center mb-8"><img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Lightsaber_logo.png" alt="lightsaber logo"></img>
        </div>
      </h3>


{/* below is the button to save your lightsaber */}
      <Card className="bg-dark text-white">
        <Card.Body>
        <h2 className="text-center mb-4">Save Lightsaber</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group id="save">
              <Form.Label placeholder="May the Force be With You">Name Your Lightsaber</Form.Label>
              <Form.Control type="save" ref={saveRef} required />
            </Form.Group>
          {/* ----screenshot button save to server---- */}
            <Button disabled={loading} className="w-100" onClick={startCapture}>
            SAVE
            </Button>
          </Form>




        </Card.Body>
      </Card>
      <br></br>
      <br></br>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>


      </div>
    </>
  )
}