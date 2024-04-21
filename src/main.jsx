import React from 'react'
import ReactDOM from 'react-dom/client'
import SignUp from './SignUp/SignUp'
import Login from './Login/Login'
import SignUpAdmin from './SignUp/SignUpAdmin'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Login />
    <SignUp />
    <SignUpAdmin />
  </>
)

