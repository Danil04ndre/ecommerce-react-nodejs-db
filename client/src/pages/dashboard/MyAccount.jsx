import { useContext } from 'react'
import '../../css/PagesDashboard.css'
import profileDefault from '../../assets/user-default.png'
import DashboardContext from '../../context/DashboardContext'
const MyAccount = () => {

  const {handleFormEditProfile,handleEditImageProfile,handleSubmitEditProfile,profilePreview,formEditProfile} = useContext(DashboardContext);
  return (
    <>
    <div className="content-my-account">
      <div className="edit-profile">
        <form onSubmit={handleSubmitEditProfile} className="form-my-account">
          <h2>Datos personales</h2>
          <div className="edit-img">
            <img src={profilePreview ? profilePreview : localStorage.getItem('image') === 'imgDefault' ? profileDefault : `data:image/png;base64,${localStorage.image}`} alt="" />
            <input type="file" id="file" name='file' onChange={handleEditImageProfile}/><br />
            <label htmlFor="file"><i className="fa-regular fa-pen-to-square"></i>Editar</label>
          </div>

          <div  className='edit'>
            <label>Nombre</label><br />
            <input type="text" name='nombre' onChange={handleFormEditProfile} value={formEditProfile.nombre}/>
          </div>
          <div className='end edit'>
            <label>Telefono</label> <br />
            <input type="number" name='telefono' onChange={handleFormEditProfile} value={formEditProfile.telefono}/>
          </div>
          <div className='edit'>
            <label>Email</label><br />
            <input readOnly type="text" name='email' onChange={handleFormEditProfile} value={formEditProfile.email}/>
          </div>
          <div className='end edit'>
            <label>Direccion</label><br />
            <input type="text" name='direccion' onChange={handleFormEditProfile} value={formEditProfile.direccion}/>
          </div>
          <input type="submit" value="Guardar cambios"/>
        </form>

      </div>
    </div>

    <div className="added-products">
        <h2>Productos agreados por {localStorage.name}</h2>
    </div>
    </>
  )
}

export default MyAccount