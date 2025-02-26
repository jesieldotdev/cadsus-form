import { useState } from 'react';
import * as XLSX from 'xlsx';
import dataItems from './data';

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

export const ControllerForm = () => {

  // Estado geral
  const [formState, setFormState] = useState({
    members: [],
    address: '',
    phone: '',
    residents: 0,
    propertyType: '',
    animalType: '',
    animalQuantity: 0,
    rooms: 0,
  });

  const { members, address, phone, residents, propertyType, animalType, animalQuantity, rooms } = formState;

  // Função genérica para atualizar o estado
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Funções de manipulação de membros
  const addMember = () => {
    setFormState(prevState => ({
      ...prevState,
      members: [
        ...members,
        { tipo: '', nome: '', sus: '', mae: '', pai: '', naturalidade: '', ocupacao: '', escolaridade: '', observacao: '', nascimento: '', cor: '' }
      ]
    }));
  };

  const removeMember = (index: number) => {
    setFormState(prevState => ({
      ...prevState,
      members: members.filter((_, i) => i !== index),
    }));
  };

  const handleMemberInputChange = (index: number, field: keyof FamilyMember, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormState(prevState => ({
      ...prevState,
      members: updatedMembers,
    }));
  };

  // Função para exportar para excel
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

  const data = {
    homeAddress: address,
    homePhone: phone,
    residentsQuantity: residents,
    propertyType,
    animalQuantity,
    animalType,
    members,
    roomsQuantity: rooms,
  };

  // Definindo campos dinamicamente
  const formFields = [
    {
      label: 'Endereço',
      name: 'address',
      type: 'text',
      value: address,
      handleChange: handleInputChange,
      placeholder: "Rua qualquer, n77..."
    },
    {
      label: 'Tel. Contato',
      name: 'phone',
      type: 'tel',
      value: phone,
      handleChange: handleInputChange,
      placeholder: "99 99999-9999"
    },
    {
      label: 'Qt. de moradores',
      name: 'residents',
      type: 'number',
      value: residents,
      handleChange: handleInputChange,
    },
    {
      label: 'Qt. de cômodos',
      name: 'rooms',
      type: 'number',
      value: rooms,
      handleChange: handleInputChange,
    },
    {
      label: 'Tipo de imóvel',
      name: 'propertyType',
      type: 'select',
      value: propertyType,
      options: dataItems.propertyTypes,
      handleChange: handleInputChange,
    },
    {
      label: 'Animais?',
      name: 'animalType',
      type: 'text',
      value: animalType,
      handleChange: handleInputChange,
      placeholder: "Cachorro, Gato"
    },
    {
      label: 'Quantos?',
      name: 'animalQuantity',
      type: 'number',
      value: animalQuantity,
      handleChange: handleInputChange,
    },
  ];

  return {
    dataItems,
    formState,
    addMember,
    removeMember,
    handleMemberInputChange,
    handleInputChange,
    exportToExcel,
    printForm,
    data,
    formFields,
    members
  };
};
