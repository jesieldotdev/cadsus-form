import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import FamilyMemberForm from './components/FamilyMemberForm';

const Form: React.FC = () => {
  const [members, setMembers] = useState<number[]>([]);
  const [memberData, setMemberData] = useState<any[]>([]);

  const addMember = () => {
    setMembers([...members, members.length]);
    setMemberData([...memberData, { tipo: '', nome: '', sus: '', mae: '', pai: '', natural: '', ocupacao: '', cor: '', escolaridade: '', observacao: '' }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
    setMemberData(memberData.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedMemberData = [...memberData];
    updatedMemberData[index][field] = value;
    setMemberData(updatedMemberData);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(memberData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Familia');
    XLSX.writeFile(workbook, 'familia.xlsx');
  };

  const printForm = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Família</h1>
      {members.map((member, index) => (
        <FamilyMemberForm
          key={index}
          index={index}
          removeMember={removeMember}
          handleInputChange={handleInputChange}
          memberData={memberData[index]}
        />
      ))}
      <button
        onClick={addMember}
        className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Adicionar Membro da Família
      </button>
      {
        memberData.length ? <>      <button
          onClick={exportToExcel}
          className="mt-4 px-4 py-2 w-full bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Exportar para Excel
        </button>
          <button
            onClick={printForm}
            className="mt-4 px-4 py-2 w-full bg-gray-500 text-white rounded-md hover:bg-gray-700"
          >
            Imprimir
          </button></> : null
      }

    </div>
  );
};

export default Form;
