import React, { useState, createContext } from 'react';

// Creamos el contexto
export const SidebarContext = createContext();

// Definimos el proveedor del contexto
const SidebarProvider = ({ children }) => {
  // Estado para controlar si la barra lateral está abierta o cerrada
  const [isOpen, setIsOpen] = useState(false);
  // Función para cerrar la barra lateral
  const handleClose = () => {
    setIsOpen(false);
  }

  // Proporcionamos el estado y la función al contexto para que los componentes hijos puedan acceder a ellos
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>{children}</SidebarContext.Provider>
  );
};

export default SidebarProvider;