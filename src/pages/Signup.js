import React from 'react'
import login from "../assets/login.png"
import Template from '../components/Template'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Buy, sell and find just about anything using the app on your mobile."
      image={login}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup
