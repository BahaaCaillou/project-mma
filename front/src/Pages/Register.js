import { useState } from "react"
import axios from "axios"

const Register = () => {
    const [email, setEmail] = useState("")
    const [login, setLogin] = useState("")
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")

    const handleChange = (e) => {
        if(e.target.name === "email"){
            setEmail(e.target.value)
        }else if(e.target.name === "password"){
            setPassword(e.target.value)
        }else if(e.target.name === "login"){
            setLogin(e.target.value)
        }
    

    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/
       if(!checkPwd.test(password)){
        setMessage("Le mot de passe ne respecte pas les conditions: 8 caractères, Majuscule, Minuscule et caractères spéciaux. ")
       }
        let dataForm = {
            login: login,
            password: password,
            email: email
        }
        axios.post(`${process.env.REACT_APP_API}/register`, dataForm)
        .then((res)=>{
            setMessage(res.data.message)
        })
    }


    return(

        <div className="register-container">

        <form method="post" onSubmit={handleSubmit} className="register-form" role="form">
        <h2 style={{paddingLeft: 1 + 'em'}} aria-label="inscription">Rejoignez-nous !</h2>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={email}/>
            <label htmlFor="login">Login</label>
            <input type="text" placeholder="Login" name="login" onChange={handleChange} value={login}/>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} value={password}/>
            <button>Envoyer</button>
            {message&&(
                <p>{message}</p>
            )}

        </form>
        </div>
    )
}

export default Register