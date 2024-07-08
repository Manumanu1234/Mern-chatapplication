import React, { useState } from 'react'
import styles from "./Login.module.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpass] = useState('')
  const navigate = useNavigate()
  axios.defaults.withCredentials=true;
  function handlesubmit(e) {
    e.preventDefault()
    axios.post("http://localhost:3001/", {
      name: name,
      email: email,
      password: password
    })
      .then((response) => {
        console.log("not")
        console.log(response.data.data.status)
        console.log("comming")
        if (response.data.data.status==true) {
          toast("New Account Created sucessfully");
          navigate('/app/welcome')
          console.log("logineed");
          console.log(response.data);
        } else {
         navigate('/')
         toast("New Account Created sucessfully");
         

        }
      });
  }


  return (

    <div className={styles.container}>
<ToastContainer />
      <div className={styles.screen}>
        <div className={styles.screen__content}>
          <form onSubmit={handlesubmit} className={styles.login}>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-user`}></i>
              <input value={name} onChange={(e) => { setname(e.target.value) }} type="text" className={styles.login__input} placeholder="userName" />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-user`}></i>
              <input value={email} onChange={(e) => { setemail(e.target.value) }} type="text" className={styles.login__input} placeholder="Email" />
            </div>
            <div className={styles.login__field}>
              <i className={`${styles.login__icon} fas fa-lock`}></i>
              <input value={password} onChange={(e) => { setpass(e.target.value) }} type="password" className={styles.login__input} placeholder="Password" />
            </div>
            <button type='submit' className={`${styles.button} ${styles.login__submit}`}>
              <span className={styles.button__text}>Signup</span>
              <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
            </button>
          </form>
          <div className={styles.socialLogin}>
            <h3 style={{ float: "right", marginRight: "10px" }}>log in via</h3>
            <div className={styles.socialIcons}>
              <a href="#" className={`${styles.socialLogin__icon} fab fa-instagram`}></a>
              <a href="#" className={`${styles.socialLogin__icon} fab fa-facebook`}></a>
              <a href="#" className={`${styles.socialLogin__icon} fab fa-twitter`}></a>
            </div>
          </div>
        </div>
        <div className={styles.screen__background}>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
          <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
        </div>
      </div>
    </div>
  )
}

export default Login