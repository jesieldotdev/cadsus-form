import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { BreadCrumb } from '../../components/BreadCrumb';


const MemberDetail: React.FC = () => {
    const [, actions, select] = useStore();

  const {
    domicile: {
      getMemberBySUS,
      getDomicileBySUS,
      getMemberByID,
      getDomicileByMemberId
    }
  } = actions


  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };



  const member = id ? getMemberByID(id) : null 

  const domicile = id ? getDomicileByMemberId(id) : null

  

  if (!member) {
    return <div>Membro não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <BreadCrumb actualPageTitle={`${domicile?.homeAddress} /${member.name}`} />


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
