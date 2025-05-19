import React, { useEffect } from "react";
import Table from "../../components/Table";
import useInventory from "../../hooks/useInventory";

function InventarioList() {
  const { productos, cargarProductos } = useInventory();

  useEffect(() => {
    cargarProductos();
  }, []);

  const columnas = ["nombre", "categoria", "precio", "stock"];

  return (
    <div>
      <h2>Inventario</h2>
      <Table columns={columnas} data={productos} />
    </div>
  );
}

export default InventarioList;
