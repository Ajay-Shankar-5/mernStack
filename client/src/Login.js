import { useState } from 'react';
import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function  loginUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/login',{
      method : 'POST',
      headers: {
        'content-type' : 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if(data.user){
        localStorage.setItem('token',data.user)
        alert('login successful')
        window.location.href = '/story'
    } else{
        alert('please check your credentials')
    }

    console.log(data)
  } 
    return (
    <div className="login">
      <h1 className='header'>Login</h1>
      <form onSubmit={loginUser}>
        <input
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        />
        <br />
        <input
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        />
        <br/>
        <input className='login-button'
        type = 'submit'
        value= 'Login'
        />

      </form>
    </div>
  );
}

export default Login;
