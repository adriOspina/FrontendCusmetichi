import React, { useState, useEffect } from 'react';

const OutputList = () => {
  // Step 1: Set up state to hold the list of outputs
  const [outputList, setOutputList] = useState([]);

  // Step 2 & 3: Fetch data from backend API and store it in state
  useEffect(() => {
    const fetchOutputs = async () => {
      try {
        const response = await fetch('http://localhost:8085/api/inventory/all'); // Adjust the URL to your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Step 3: Store fetched data in state
        setOutputList(data);
      } catch (error) {
        console.error('Failed to fetch outputs:', error);
      }
    };

    fetchOutputs();
  }, []); // Empty dependency array means this effect runs once when component mounts

  // Step 4: Render the list of outputs
  return (
    <div>
      <h1>Output List</h1>
      <ul>
        {outputList.map(output => (
          <li key={output.id}>
            <p>ID: {output.id}</p>
            <p>Cantidad Salidas: {output.cantidadSalidas}</p>
            <p>Tipo Salida: {output.tipoSalida}</p>
            <p>Fecha Salida: {output.fechaSalida}</p>
            <p>IVA Total: {output.ivaTotal}</p>
            <p>Metodo Pago: {output.metodoPago}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutputList;
