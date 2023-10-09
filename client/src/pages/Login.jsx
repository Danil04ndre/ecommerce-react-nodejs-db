import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';
import FormContext from '../context/FormContext';
const Login = () => {

  const {isAuthEmployee,isAuthUser,handlePassword,visiblePassword, handleFormLogin,handleLogin,formLogin,emailNotFound,falsePassword} = useContext(FormContext);
    
  
  if(isAuthEmployee){
    return <Navigate to="/dashboard"/>
  } else if(isAuthUser){
    return <Navigate to="/"/>

  }
  return (
    <div className='content-form'>
      <form onSubmit={handleLogin}>
        <h1>Iniciar sesion</h1>
        <span>Lorem ipsum dolor sit amet.</span>
        <div>
          <input type="email" autoComplete="off" placeholder="Email" name="email" required onChange={handleFormLogin} value={formLogin.email}/>
          <i className="fa-regular fa-envelope"></i>
        </div>
        <div>
          <input
            type={!visiblePassword ? "password" : "text"}
            placeholder="Contraseña"
            required
            name='contrasena'
            onChange={handleFormLogin}
            value={formLogin.contrasena}
          />
          {!visiblePassword ? (
            <i className="fa-regular fa-eye-slash" onClick={handlePassword}></i>
          ) : (
            <i className="fa-regular fa-eye" onClick={handlePassword}></i>
          )}
        </div>
        {emailNotFound && <span style={{color: 'red', textAlign: 'start', fontWeight: 'bold'}}>{emailNotFound}</span>}
        {falsePassword && <span style={{color: 'red', textAlign: 'start', fontWeight: 'bold'}}>{falsePassword}</span>}

        <input type="submit" value="Iniciar sesion" />
        <small className="acount-list">¿No tienes cuenta? <Link to="/register"><strong>Crear Cuenta</strong></Link></small>
      </form>
    </div>
  )
}

export default Login