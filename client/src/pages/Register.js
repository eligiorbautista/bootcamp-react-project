 
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import Axios from 'axios';
import '../style.css';


function Register() {
    const [regFname, setRegFname] = useState('');
    const [regLname, setRegLname] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setregPassword] = useState('');
    const [regConfirmPassword, setregConfirmPassword] = useState('');


    // CREATE NEW USER
    const RegisterUser = async() => {
      const fetchData = Axios.create({
        baseURL : 'http://localhost:8000',
        headers : {"Content-Type" : "application/json", "Access-Control-Allow-Origin": "*"},
        method : 'POST'
      })
      try {
        const response = await fetchData.post('/users', {
          "firstName":regFname, 
          "lastName":regLname, 
          "email":regEmail, 
          "password":regConfirmPassword
        })
        console.log(response)
      }
      catch (err) {
        console.log(err)
      }
    }
    
    function SignUpFormValidation (e) {
      e.preventDefault();
      const ValidateEmail = require('../email-validator');
      if (regFname !== '' &&  regLname !== '' && regEmail !== '' &&  regPassword !== '' && regConfirmPassword !== ''){
        if (ValidateEmail(regEmail)) {
          if (regPassword !== regConfirmPassword) {
            alert('Password & Confirm Password do not match. Please check your input/s and try again.')
          }
          else {
            RegisterUser();
            alert(`Congratulations ${regFname} ${regLname}, your account has been successfully created.`);
            // // from_,to_,subject_,text_,html_
            // SendNotification('This is from',regEmail, 'This is subject', 'This is text','This is html' )
            setRegFname('');
            setRegLname('');
            setRegEmail('');
            setregPassword('');
            setregConfirmPassword('');
          }
        }
        else {
          alert("Invalid email. Please enter a valid email address.")
        }
      }
      else {
        alert(`Form cannot be blank. Please check your input/s and try again.`);
      }
    }

    {/** REGISTER **/}
    return( 
    <div className="container"> 
    <input type="checkbox" id="check"></input>
    <div className="registration form">
      <header>Sign Up</header>
      <form onSubmit={SignUpFormValidation}>
        <input 
        type="text" 
        placeholder="First Name" 
        onChange={ (val) => setRegFname(val.target.value) } 
        value={ regFname }/> 
        <input 
        type="text" 
        placeholder="Last Name" 
        onChange={ (val) => setRegLname(val.target.value) } 
        value={ regLname }/>
        <input 
        type="text" 
        placeholder="Email" 
        onChange={ (val) => setRegEmail(val.target.value) } 
        value={ regEmail }/>
        <input 
        type="password" 
        placeholder="Password" 
        onChange={ (val) => setregPassword(val.target.value) } 
        value={ regPassword }/>
        <input 
        type="password" 
        placeholder="Confirm Password" 
        onChange={ (val) => setregConfirmPassword(val.target.value) } 
        value={ regConfirmPassword }/>
        <input 
        type="submit" 
        className="button" 
        value="Signup"/>
 
      </form>
      <div className="signup">
        <span className="signup">Already have an account?
        <Link to='/'> <label > Sign In</label> </Link>
        </span>
      </div>
      
    </div>
  </div>
  
        );
}

export default Register;
