import '../style.css';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [updFname, setUpdFname] = useState('First Name');
    const [updLname, setUpdLname] = useState('Last Name');
    const [updEmail, setUpdEmail] = useState('');
    const [updPassword, setUpdPassword] = useState('');

    useEffect(() => {
        fetchUserData();
    }, [])

    const baseUrl = 'http://localhost:8000/users';
    const userID = '64895977e44e9401d3e90a68'

    // FETCH USER DATA
    const fetchUserData = async () => {
        const response = await Axios.get(`${baseUrl}/${userID}`)
        setUpdFname(response.data.result.firstName);
        setUpdLname(response.data.result.lastName);
        setUpdEmail(response.data.result.email);
        setUpdPassword(response.data.result.password);    
    }   

    // UPDATE USER DATA
    const updateUserData = async () => {
        const payload = {
            firstName : updFname,
            lastName : updLname,
            email : updEmail,
            password : updPassword
        }

        const response = await Axios.put(`${baseUrl}/${userID}`, payload)
        await fetchUserData();  
        alert('User has been successfully updated.')
    }

    // DELETE USER DATA
    const deleteUserData = async () => {
        const response = await Axios.delete(`${baseUrl}/${userID}`)
        alert('User has been successfully deleted.')
    }

    return( 
        <div className='App'>
           <div className='container'>
            <div className='form'>
                 
                <h2>Welcome, {updFname} {updLname}<br></br>Account Settings</h2>
                <h3>First Name</h3>
                <input type="text" placeholder="First Name" onChange={ (val) => setUpdFname(val.target.value) } value={ updFname }/>
                <h3>Last Name</h3>
                <input type="text" placeholder="Last Name" onChange={ (val) => setUpdLname(val.target.value) } value={ updLname }/>
                <h3>Email</h3>
                <input type="text" placeholder="Email" onChange={ (val) => setUpdEmail(val.target.value) } value={ updEmail }/>
                <h3>Password</h3>
                <input type="password" placeholder="Password" onChange={ (val) => setUpdPassword(val.target.value) } value={ updPassword }/>
                <input type="button" className="button" value="Update Changes" onClick={updateUserData}/>
                <Link to={'/'}><input type="button" className="button" value="Delete Account" onClick={deleteUserData}/></Link>
                <Link to={'/'}><input type="button" className="button" value="Log Out"/></Link>
           
            </div>
           </div>
      
        </div>
        );
}

export default Dashboard;
