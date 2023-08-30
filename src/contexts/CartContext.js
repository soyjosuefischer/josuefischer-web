import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const CartContext = createContext();

// Definimos el proveedor del contexto
const CartProvider = ({ children }) => {
  // Estado para almacenar los elementos en el carrito
  const [cart, setCart] = useState([]);
  // Estado para almacenar la cantidad total de elementos en el carrito
  const [itemAmount, setItemAmount] = useState(0);
  // Estado para almacenar el total de la compra
  const [total, setTotal] = useState(0);

  // Efecto para calcular el total de la compra en base a los elementos en el carrito
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount
    }, 0);
    setTotal(total);
  });

  // Efecto para calcular la cantidad total de elementos en el carrito
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0 );
      setItemAmount(amount);
    }
  }, [cart]);

  // Función para agregar un producto al carrito
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Función para incrementar la cantidad de un producto en el carrito
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  // Función para decrementar la cantidad de un producto en el carrito
  const decreaseAmount = (id) => {
    const cartItem = cart.find(item => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 }
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  }

  // Proporcionamos el contexto y las funciones a los componentes hijos
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total }}>{children}</CartContext.Provider>
  );
};

export default CartProvider;