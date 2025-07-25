import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"


const Contacts =()=>{
    const {store,dispatch}= useGlobalReducer();
    const API_URL = "https://playground.4geeks.com/contact/agendas/MafeG/contacts"

    const getContacts = async () =>{
        try{
            const response = await fetch(API_URL)
            const data = await response.json()
            dispatch({type : "set_contacts", payload: data.contacts}) 
        }catch(error){
        console.error(error)
        }

    }
    const deleteContact = async (id) =>{ 
        if(confirm("¿Eliminar contacto?")){
            try {
                await fetch(`${API_URL}/${id}`,{
                    method: "DELETE"
                })
                dispatch({type: "delete_contact", payload : id})
            } catch (error) {
              console.error(error)
            }
        }
    }
    useEffect(()=>{
        getContacts();
    }, [])
    return(
        <div>
            <div className="d-flex justify-content-between mb-4">
                <h1>Contactos</h1>
                <Link to="/add" className="btn btn-success">+Agregar</Link>
            </div>
            {store.contacts?.length === 0 ?(
                <p>No hay contactos</p>
            ):(
                store.contacts?.map(contact =>(
                    <div key={contact.id} className="card mb-2">
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <h5>{contact.name}</h5>
                                <p className="mb-0">{contact.email} | {contact.phone} </p>
                                <small>{contact.adress} </small>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteContact(contact.id)}>
                            Eliminar
                            </button>
                        </div>
                        </div>
                ))
            
            )}
        </div>
    )
    
}
export default Contacts;