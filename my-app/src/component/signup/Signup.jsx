import React, { useState } from 'react';
import styles from './signup.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: email,
                password: password
            });

            if (response.data === true) {
                navigate('/app/welcome');
            } else {
                toast.error('Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Failed to login. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.screen}>
                <div className={styles.screen__content}>
                    <form onSubmit={handleSubmit} className={styles.login}>
                        <div className={styles.login__field}>
                            <i className={`${styles.login__icon} fas fa-user`}></i>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                className={styles.login__input}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className={styles.login__field}>
                            <i className={`${styles.login__icon} fas fa-lock`}></i>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className={styles.login__input}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button type="submit" className={`${styles.button} ${styles.login__submit}`}>
                            <span className={styles.button__text}>Login</span>
                            <i className={`${styles.button__icon} fas fa-chevron-right`}></i>
                        </button>
                    </form>
                    <div className={styles.socialLogin}>
                        <h3 style={{ float: 'right', marginRight: '10px' }}>log in via</h3>
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
    );
}

export default Signup;
