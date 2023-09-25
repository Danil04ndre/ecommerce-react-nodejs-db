import React, { useContext } from 'react'
import '../../css/PagesDashboard.css'
import profileDefault from '../../assets/user-default.png'
import DashboardContext from '../../context/DashboardContext'
const MyAccount = () => {

  const {handleFormEditProfile,handleEditImagenProfile,handleSubmitEditProfile} = useContext(DashboardContext);
  return (
    <div className="content-my-account">
      <div className="edit-profile">
        <form onSubmit={handleSubmitEditProfile}>
          <div className="edit-img">
            <img src={profileDefault} alt="" />
            <input type="file" id="file" name='file' onChange={handleEditImagenProfile}/><br />
            <label htmlFor="file"><i className="fa-regular fa-pen-to-square"></i>Editar</label>
          </div>

          <div>
            <label>Nombre</label><br />
            <input type="text" name='nombre' onChange={handleFormEditProfile}/>
          </div>
          <div className='end'>
            <label>Telefono</label> <br />
            <input type="text" name='telefono' onChange={handleFormEditProfile}/>
          </div>
          <div>
            <label>Email</label><br />
            <input type="text" name='email' onChange={handleFormEditProfile}/>
          </div>
          <div className='end'>
            <label>Direccion</label><br />
            <input type="text" name='direccion' onChange={handleFormEditProfile}/>
          </div>
          <input type="submit"  value="fdf" name="" id="" />
        </form>

      </div>

    </div>
  )
}

export default MyAccount