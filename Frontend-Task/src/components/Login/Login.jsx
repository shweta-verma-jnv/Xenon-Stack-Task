import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://task-backend-q4kt.onrender.com/login', { email, password });
      toast.success('Login successful!');
      onLogin(data.name);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <MDBContainer fluid className="box">
      <form onSubmit={handleSubmit}>
        <MDBRow className="d-flex justify-content-center align-items-center h-75">
          <MDBCol col="12">
            <MDBCard className="bg-white my-4 mx-auto" style={{ borderRadius: '1rem', maxWidth: '450px' }}>
              <MDBCardBody className="p-4 w-100 d-flex flex-column">
                <h6 className="fw-bold mb-2 text-center text-dark">Log in to your account</h6>
                <MDBBtn className="mb-4 w-150 text-capitalize" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                  <MDBIcon fab icon="google" className="mx-2" />
                  Continue with Google
                </MDBBtn>
                <MDBInput wrapperClass="mb-4 w-100" onChange={(e) => setEmail(e.target.value)} name="email" label="Email" id="email" type="email" size="lg" />
                <MDBInput wrapperClass="mb-4 w-100" onChange={(e) => setPassword(e.target.value)} name="password" label="Password" id="pwd" type="password" size="lg" />
                <div className="d-flex justify-content-between text-dark mb-4">
                  <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
                  <a href="!#">Forgot password?</a>
                </div>
                <MDBBtn className="mb-2 w-150 fw-bold text-capitalize" size="lg">
                  Log in
                </MDBBtn>
                <hr className="my-3 text-muted" />
                <p className="text-center text-body pb-0">
                  Don't have an account? <Link to="/signup" className="sign_up">Sign up</Link>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
};

export default Login;