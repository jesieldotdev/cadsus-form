import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import FamilyMemberForm from './components/FamilyMemberForm';

interface FamilyMember {
  tipo: string;
  nome: string;
  sus: string;
  mae: string;
  pai: string;
  naturalidade: string;
  ocupacao: string;
  escolaridade: string;
  observacao: string;
  cor: string;
  nascimento: Date | '';
}

const Form: React.FC = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [residents, setResidents] = useState<number>();
  const [propertyType, setPropertyType] = useState<string>('');
  const [animalType, setAnimalType] = useState<string>('');
  const [animalQuantity, setAnimalQuantity] = useState<number>();
  const [rooms, setRooms] = useState<number>();

  const addMember = () => {
    setMembers([...members, { tipo: '', nome: '', sus: '', mae: '', pai: '', naturalidade: '', ocupacao: '', escolaridade: '', observacao: '', nascimento: '', cor:'' }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberInputChange = (index: number, field: keyof FamilyMember, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleResidentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResidents(Number(e.target.value));
  };

  const handleRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRooms(Number(e.target.value));
  };

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(e.target.value);
  };
  const handleAnimalTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnimalType(e.target.value);
  };
  const handleAnimalQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnimalQuantity(e.target.value);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(members);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Cadastro - ${address}`);
    XLSX.writeFile(wb, `Cadastro - ${address}.xlsx`);
  };

  const printForm = () => {
    document.title = `Cadastro - ${address}`;
    window.print();
  };

  const propertyTypes = [
    "Outro",
    "Situação de Rua",
    "Ocupação",
    "Cedido",
    "Arrendado",
    "Alugado",
    "Financiado",
    "Próprio"
  ];


  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Formulário da Família</h1>
      <div className="mb-4 space-y-2">

        <div className="flex space-x-4">

          <div className='w-2/3'>
            <label className="block text-gray-700">Endereço</label>
            <input
              type="text"
              name="endereco"
              value={address}
              placeholder='Rua qualquer, n000'
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          <div className='w-1/3'>
            <label className="block text-gray-700">Tel. Contato</label>
            <input
              type="tel"
              name="phone"
              placeholder='99 99999-9999'
              value={phone}
              onChange={handlePhoneChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

        </div>

        <div className="flex space-x-4 text-sm">
          <div className='w-1/4'>
            <label className="block text-gray-700">Qt. de moradores</label>
            <input
              type="number"
              name="residentes"
              value={residents}
              onChange={handleResidentsChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>
          <div className='w-1/4'>
            <label className="block text-gray-700">Qt. de cômodos</label>
            <input
              type="number"
              name="rooms"
              value={rooms}
              onChange={handleRoomsChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>
          <div className='w-2/4'>
            <div>
              <label className="block text-gray-700">Tipo de imóvel</label>
              <select
                name="propertyType"
                value={propertyType}
                onChange={handlePropertyTypeChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 text-sm"
              >
                {
                  propertyTypes.map(item =>
                    <option value={item} key={item}>{item}</option>
                  )
                }
              </select>
            </div>
          </div>
          <div className='w-1/4'>
            <label className="block text-gray-700">Animais?</label>
            <input
              type="text"
              name="animalType"
              placeholder='Cachorro, gato'
              value={animalType}
              onChange={handleAnimalTypeChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
            />
            <label className="block text-gray-700">Quantos?</label>
            <input
              type="number"
              name="animalType"
              value={animalQuantity}
              onChange={handleAnimalQuantityChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

        </div>

      </div>
      {members.map((member, index) => (
        <FamilyMemberForm
          key={index}
          index={index}
          removeMember={removeMember}
          handleInputChange={handleMemberInputChange}
          memberData={member}
        />
      ))}
      <button onClick={addMember} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Adicionar Membro</button>
      <button onClick={exportToExcel} className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded-md">Exportar para Excel</button>
      <button onClick={printForm} className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded-md">Imprimir</button>
    </div>
  );
};

export default Form;
