import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Member } from '../../types'; // Importe seus tipos de Member
import { mockDomicileItem } from '../../store/domicile/utils'; // Dados fictícios

const MemberDetail: React.FC = () => {
  const { sus } = useParams<{ sus: string }>(); // Pegando o SUS do membro da URL
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  // Encontrar o membro pelo SUS
  const member = mockDomicileItem
    .flatMap(domicilio => domicilio.familyMembers)
    .find(member => member.sus === sus);

  const domicile = mockDomicileItem
  .filter(domicilio => domicilio.familyMembers)
  .find(member => member);

  console.log(domicile )

  if (!member) {
    return <div>Membro não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

            {/* Breadcrumb com o botão de voltar */}
      <div className="flex items-center space-x-2 mb-6">
        <button
          onClick={handleBack}
          className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2"
        >
          <span className="font-semibold">Voltar</span>
        </button>
        <span>/</span>
        <span className="font-medium text-gray-600">{domicile?.homeAddress} /{member.name}</span>
      </div>
      <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Detalhes do Membro</h1>

      {/* Informações do Membro */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="text-lg font-medium text-gray-700">
          <p><strong>Nome:</strong> {member.name}</p>
          <p><strong>SUS:</strong> {member.sus}</p>
          <p><strong>Tipo:</strong> {member.type}</p>
          <p><strong>Ocupação:</strong> {member.occupation}</p>
          <p><strong>Grau de estudo:</strong> {member.degreeOfStudy}</p>
        </div>

        {/* Informações de saúde */}
        <div className="text-sm text-gray-600">
          <p><strong>Estado de saúde:</strong> {member.healthInfo.healthStatus}</p>
          <p><strong>Está grávida:</strong> {member.healthInfo.isPregnant ? 'Sim' : 'Não'}</p>
          {/* Adicione outras informações de saúde conforme necessário */}
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
