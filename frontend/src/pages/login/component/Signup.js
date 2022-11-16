import React, { useRef } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const SignUp = ({ show, setShow, email }) => {
  let idRef = useRef(null);
  let passwordRef = useRef(null);
  let confirmRef = useRef(null);

  const handleClose = () => setShow(false);

  const onSubmit = async (e) => {
    const id = idRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;

    e.preventDefault(); //버튼을 눌러도 새로고침 되지않도록 함
    if(password !== confirm) return alert("비밀번호가 일치하지 않습니다.")
    if (id && password) {
      console.log(id)
      console.log(password)
      // axios({
      //   url: ""
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     id,
      //     password,
      //   })
      // })
      // .then(res => {
      //     navigate('/mypage');
      // })
      // .catch(err => alert(err));
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Get your Google Email" 
                type="email"
                value={email}
                disabled
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>ID</Form.Label>
              <Form.Control 
                type="id" 
                rows={1} 
                ref={idRef}/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                rows={1} 
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password"
                rows={1} 
                ref={confirmRef}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              SignUp
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default SignUp;