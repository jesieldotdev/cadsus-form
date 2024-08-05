import React, { useEffect, useState } from 'react';

const NaturalidadeInput = ({ memberData, handleChange }) => {
  const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    const fetchDistritos = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/distritos');
        const data = await response.json();
        setDistritos(data);
      } catch (error) {
        console.error('Erro ao buscar distritos:', error);
      }
    };

    fetchDistritos();
  }, []);

  return (
    <div className="w-2/4">
      <label className="block text-gray-700">Naturalidade</label>
      <input
        list="naturalidade-options"
        name="naturalidade"
        placeholder="Boa Vista - RR"
        value={memberData.naturalidade}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
      />
      <datalist id="naturalidade-options">
        {distritos.map((distrito) => (
          <option key={distrito.id} value={`${distrito.nome} - ${distrito.municipio.microrregiao.mesorregiao.UF.sigla}`}>
            {distrito.nome} - {distrito.municipio.microrregiao.mesorregiao.UF.sigla}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default NaturalidadeInput;
