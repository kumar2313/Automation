import React from 'react'
import "./TableMain.css"
import Toast from 'react-bootstrap/Toast';
import Draggable from 'react-draggable';
function AlertDesign(props) {
  return (
<Draggable>
    <Toast className="AlertMessage" bg={props.variant} onClose={props.setShow} show={true} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{props.heading}</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
    </Toast>
    </Draggable>

    // <Alert className="AlertMessage" variant={props.variant} onClick={props.setShow}dismissible>
    //   <Alert.Heading>{props.heading}</Alert.Heading>
    //   <p>
    //     {props.message}
    //   </p>
    // </Alert>
  );
}

export default AlertDesign;