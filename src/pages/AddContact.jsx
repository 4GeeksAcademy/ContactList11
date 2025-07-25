import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useState } from "react";

const AddContact = () =>{
    const navigate =useNavigate()
    const {dispatch} =useGlobalReducer()
    const [contact,setContact] = useState({name: "", email: "", phone: "", address:""})

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
         const response = await fetch('https://playground.4geeks.com/contact/agendas/MafeG/contacts',{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify(contact)
                })
                const newContact = await response.json()
                dispatch({ type: "add_contact", payload : newContact})
                navigate("/")
        } catch (error) {
            console.error(error)
        }
    }
    const handleChange =(e) =>{
        e.preventDefault()
        setContact({...contact, [e.target.name]:e.target.value})
    }
    return(
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h3>Nuevo Contacto</h3>
                <form onSubmit={handleSubmit}>
                    <input
                    className="form-control mb-3"
                    name="name"
                    placeholder="Nombre"
                    value={contact.name}
                    onChange={handleChange}
                    required
                    />

                    <input
                    className="form-control mb-3"
                    name="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={handleChange}
                    required
                    />

                    <input
                    className="form-control mb-3"
                    name="phone"
                    placeholder="Telefono"
                    value={contact.phone}
                    onChange={handleChange}
                    required
                    />

                    <input
                    className="form-control mb-3"
                    name="address"
                    placeholder="Direccion"
                    value={contact.address}
                    onChange={handleChange}
                    required
                    />

                    <div className="d-flex gap-2">
                    <button type="button" className="btn btn-secondary" onClick={()=>navigate("/")}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary" >
                        Guardar
                    </button>

                    </div>
                </form>

            </div>

        </div>
    )
}
export default AddContact;