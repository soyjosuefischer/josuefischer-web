import React, { useContext, useState, useEffect } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { BsBag } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Header = () => {
  // Estado para controlar el estilo del encabezado en función del desplazamiento
  const [ isActive, setisActive ] = useState(false);
  // Contexto para controlar la apertura y cierre de la barra lateral
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  // Contexto para gestionar la cantidad de elementos en el carrito
  const { itemAmount, setItemAmount } = useContext(CartContext);

  // Efecto que se ejecuta cuando el componente se monta y desmonta
  useEffect(() => {
    // Agrega un oyente de desplazamiento para cambiar el estado isActive
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setisActive(true) : setisActive(false);
    });
  });
  
  // Limpia el oyente cuando el componente se desmonta
  return (
    // Encabezado con estilos condicionales según el estado isActive
    <header className={`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6 '} fixed w-full z-10 transition-all`}>
      <div className='container mx-auto flex items-center justify-between h-full'>
        <Link to="/">
          <div>
            <h1 className='text-3xl font-bold'>Josue Fischer</h1>
          </div>
        </Link>
        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative'>
          <BsBag className='text-2xl'/>
          <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{itemAmount}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;