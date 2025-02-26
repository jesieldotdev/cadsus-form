import React, { useState } from 'react';
import { MapPin, Phone, User } from 'lucide-react';
import { mockDomicileItem } from '../../store/domicile/utils';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

interface Domicile {
  homeAddress: string | undefined;
  phone: string | undefined;
  residentsQuantity: number | undefined;
}

const DomicileListData: Domicile[] = mockDomicileItem.map(item => ({
  homeAddress: item.homeAddress,
  phone: item.phone,
  residentsQuantity: item.extraData.residentsQuantity,
}));

const DomicileList: React.FC = () => {
  const navigate = useNavigate(); // Usando o useNavigate

  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredDomicileList = DomicileListData.filter(domicilio =>
    domicilio.homeAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    domicilio.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    domicilio.residentsQuantity?.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Breadcrumb com o botão de voltar */}
      <div className="flex items-center space-x-2 mb-6">
        <button
          onClick={handleBack}
          className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2"
        >
          <span className="font-semibold">Inicio</span>
        </button>
        <span>/</span>
        <span className="font-medium text-gray-600">Lista de Domicílios</span>
      </div>

      <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Lista de Domicílios</h1>

      {/* Campo de pesquisa */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Pesquisar por endereço, telefone ou moradores..."
          className="w-full max-w-md px-4 py-2 text-sm text-gray-700 bg-white rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {filteredDomicileList.length > 0 ? (
          filteredDomicileList.map((domicilio, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="text-indigo-600" size={20} />
                <span className="text-lg font-medium text-gray-700">{domicilio.homeAddress}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-green-600" size={20} />
                <span className="text-sm text-gray-600">{domicilio.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <User className="text-blue-600" size={20} />
                <span className="text-sm text-gray-600">{domicilio.residentsQuantity} moradores</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">Nenhum domicílio encontrado.</div>
        )}
      </div>
    </div>
  );
};

export default DomicileList;
