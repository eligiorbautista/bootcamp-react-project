import '../style.css';
import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
 

function Login() {
    const [logEmail, setLogEmail] = useState('');
    const [logPassword, setLogPassword] = useState('');
    const navigate = useNavigate();

    function SignInFormValidation (email, password) {
      if (email !== '' || password !== ''){
        alert(`Welcome ${email}.\nYou have successfully logged in.`);
        navigate('/dashboard');
      
      }
      else {
        alert(`Incorrect email/password.`);
      }
    }


    return( 
    <div className="container"> 
    <input type="checkbox" id="check"></input>
    {/** LOG IN **/}
    <div className="login form">
      <header>Sign In</header>
      <form action="#">
        <input 
        type="text" 
        placeholder="Enter your email" 
        onChange={ ( (val) => setLogEmail(val.target.value) ) } 
        value={ logEmail }/>
        <input 
        type="password" 
        placeholder="Enter your password" 
        onChange={ ( (val) => setLogPassword(val.target.value) ) } 
        value={ logPassword }/>
        <input 
        type="button" 
        className="button" 
        value="Login" 
        onClick={() => {
          SignInFormValidation(logEmail, logPassword);
          setLogEmail('');
          setLogPassword('');
        } }/>
      </form>
      <div className="signup">
        <span className="signup">Don't have an account?
          <Link to='/register'> <label > Sign Up</label> </Link>
        </span>
      </div>
    </div>
    </div>
    
      
  )
}

export default Login;
