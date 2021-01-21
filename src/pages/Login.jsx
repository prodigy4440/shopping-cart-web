import React, { useContext, useDispatch } from 'react'
import { Layout } from '../components/Layout'
import styled from 'styled-components'
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import { StateContext } from '../context/Context';
import { AuthProvider, loginUser, registerUser,AuthStateContext } from '../context/Auth';
import { toast } from 'react-toastify';


export const StyledLogin = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

.loginFormContainer,.switch {
    padding: 16px;
border-radius: 2px;
border: 1px solid #CCCCCC;
box-shadow: 0 2px 6px rgba(17, 17, 17, 0.07);
margin: 16px;
max-width: 480px;
width: 80%;
background-color:#ffffff;
}
.title{
    font-size:20px;
    margin-bottom: 16px;
}

.username,.password{
    display: flex;
    flex-direction:column;
    margin-bottom: 24px;
    label{
font-size: 14px;
line-height:21px;
font-weight: 500;
    }
    input{
height:48px;
padding: 16px 14px;
    border:1px solid #DDDDDD;
    border-radius: 2px;
    outline-color: #227AFF;
    }
}
.switch {
    margin-top:25px;
    display: flex;
    justify-content:space-between;
    align-items: center;
}
.account{
    color:#888888;
    font-size:14px;
}
.switchButton{
border:none;
background:transparent;
color:#227AFF;
cursor:pointer;

:hover {
    text-decoration: underline
}
}
`;
export const Login = () => {
    const history = useHistory();
    const { dispatch, user: { loading, error, token, isAuthenticated } } = useContext(AuthStateContext)

const [page, setPage] = React.useState('login')
    const [userDetails, setUserDetails] = React.useState({
        username: '',
        password: ''
    })

    React.useEffect(() => {
        const handleRedirect = () => {
            isAuthenticated && history.push('/')
        }
        handleRedirect()
    }, [])


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let response = await loginUser(dispatch, userDetails)
            if (!response || (response.status !== "SUCCESS")) {
                toast.error(!response ? 'error check your network' : response.description)
            } else {
                toast.success('Login Successful')
                history.push('/') //navigate to dashboard on success
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            let response = await registerUser(dispatch, userDetails)
            if (!response || (response.status !== "SUCCESS")) {
                toast.error(!response ? 'error check your network' : response.description)
            } else {
                toast.success('Account Creation Successful')
                setPage('login')
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }


    const handleUserInput = (e) => {
        setUserDetails({
            ...userDetails, [e.target.name]: e.target.value
        })
    }

    const handleSwitchPage = () => {
        page === 'login' ? setPage('register'): setPage('login')
    }

    return (
        <Layout
            isCartPresent={false}
        >
            <StyledLogin>
                <form className="loginFormContainer" onSubmit={page==='login' ? handleLogin : handleRegistration}>
                    <p className="title"> {page==='login' ? 'Login' : 'Register'}</p>
                    <div className="username">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="username"
                            id="email"
                            placeholder="Email"
                            onChange={handleUserInput}
                            required
                            value={userDetails.email} />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleUserInput}
                            required
                            value={userDetails.password} />
                    </div>
                    <Button
                        type="submit"
                        onClick={page==='login' ? handleLogin : handleRegistration}
                        disabled={loading}
                        isLoading={loading}
                        buttonText={page==='login' ? 'Login' : 'Create Account'}
                        loadingText="Processing..."
                    />
                </form>

                <div className="switch">
<p className="account"> {page==='login' ? ' Dont have an Account?' : ' Have an Account?'}</p>
<button className="switchButton" onClick={handleSwitchPage}>{page==='register' ? 'Login' : 'Register'}</button>
                </div>
            </StyledLogin>
        </Layout>
    )
}
