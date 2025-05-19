import { useState } from "react";

function useInventory(initialStock = 0) {
  const [stock, setStock] = useState(initialStock);

  const increaseStock = amount => {
    setStock(prev => prev + amount);
  };

  const decreaseStock = amount => {
    if (amount <= stock) {
      setStock(prev => prev - amount);
    } else {
      console.warn("No hay suficiente stock");
    }
  };

  return {
    stock,
    increaseStock,
    decreaseStock,
    setStock,
  };
}

export default useInventory;
