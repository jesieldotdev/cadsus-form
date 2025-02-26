import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FamilyMemberForm } from './components/FamilyMemberForm';
import { UserProfiles } from '../Print';
import { ControllerForm } from './viewController';
import { BreadCrumb } from '../../components/BreadCrumb';

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
  const {
    dataItems,
    members,
    address,
    phone,
    residents,
    propertyType,
    animalType,
    animalQuantity,
    rooms,
    addMember,
    removeMember,
    handleMemberInputChange,
    handleAddressChange,
    handlePhoneChange,
    handleResidentsChange,
    handleRoomsChange,
    handlePropertyTypeChange,
    handleAnimalTypeChange,
    handleAnimalQuantityChange,
    exportToExcel,
    printForm,
    data
  } = ControllerForm()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <BreadCrumb actualPageTitle='Novo Cadastro' />

      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Formulário de Cadastro da Família</h1>
      <div className="space-y-6">

        {/* Endereço e Telefone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Endereço</label>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Rua qualquer, n77..."
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-gray-700">Tel. Contato</label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="99 99999-9999"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        {/* Residentes, Cômodos e Tipo de Imóvel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700">Qt. de moradores</label>
            <input
              type="number"
              value={residents}
              onChange={handleResidentsChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-gray-700">Qt. de cômodos</label>
            <input
              type="number"
              value={rooms}
              onChange={handleRoomsChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-gray-700">Tipo de imóvel</label>
            <select
              value={propertyType}
              onChange={handlePropertyTypeChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {dataItems.propertyTypes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Animais */}
        <div>
          <label className="block text-gray-700">Animais?</label>
          <input
            type="text"
            value={animalType}
            onChange={handleAnimalTypeChange}
            placeholder="Cachorro, Gato"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <label className="block text-gray-700 mt-2">Quantos?</label>
          <input
            type="number"
            value={animalQuantity}
            onChange={handleAnimalQuantityChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Adicionar Membro */}
        {members.map((member, index) => (
          <FamilyMemberForm
            key={index}
            index={index}
            removeMember={removeMember}
            handleInputChange={handleMemberInputChange}
            memberData={member}
          />
        ))}
        <button
          onClick={addMember}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Adicionar Membro
        </button>

      </div>

      {/* UserProfiles Component */}
      {data && data.homeAddress && <UserProfiles data={data} />}

      {/* Optional: Buttons to export or print */}
      <div className="mt-6 flex space-x-4">
        {/* <button onClick={exportToExcel} className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600">Exportar para Excel</button> */}
        {/* <button onClick={printForm} className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600">Imprimir</button> */}
      </div>
    </div>
  );
};

export default Form;
