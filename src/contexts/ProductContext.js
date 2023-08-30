import React, {createContext, useState, useEffect} from 'react';

// Creamos el contexto
export const ProductContext = createContext();

// Definimos el proveedor del contexto
const ProductProvider = ({children}) => {
  // Estado para almacenar los productos
  const [products, setProducts] = useState([]);

  // Efecto para cargar los productos desde la API al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      // Realizamos una solicitud a la API de productos falsos
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    };

    // Invocamos la función para cargar los productos
    fetchProducts();
  }, []);

  // Proporcionamos los productos al contexto para que los componentes hijos puedan acceder a ellos
  return <ProductContext.Provider value={{products}}>{children}</ProductContext.Provider>;
};

export default ProductProvider;