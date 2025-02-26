import { useState } from 'react';
import * as XLSX from 'xlsx';
import dataItems from './data';

// interface FamilyMember {
//   tipo: string;
//   nome: string;
//   sus: string;
//   mae: string;
//   pai: string;
//   naturalidade: string;
//   ocupacao: string;
//   escolaridade: string;
//   observacao: string;
//   cor: string;
//   nascimento: Date | '';
// }

export const ControllerForm = () => {
  const [formState, setFormState] = useState<DomicileItem>({
    familyMembers: [],
    id: '',
    homeAddress: '',
    phone: '',
    extraData: {
      accessToResidenceType: undefined,
      animalQuantity: 0,
      animalTypes: undefined,
      electricityAvailability: false,
      hasLivedSince: undefined,
      predominantConstructionMaterial: undefined,
      propertyType: undefined,
      residenceType: undefined,
      residentsQuantity: undefined,
      roomsQuantity: 0,
      waterSupply: undefined,
      waterTreatment: undefined
    }
  });

  const { familyMembers, extraData, homeAddress, phone } = formState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addMember = () => {
    setFormState(prevState => ({
      ...prevState,
      familyMembers: [
        ...familyMembers,
        { type: '', name: '', sus: '', mother: '', father: '', naturality: '', occupation: '', degreeOfStudy: '', observation: '', naturalFrom: '', skinTone: '', dateOfBirth: '', healthInfo: undefined }
      ]
    }));
  };

  const removeMember = (index: number) => {
    setFormState(prevState => ({
      ...prevState,
      familyMembers: familyMembers.filter((_, i) => i !== index),
    }));
  };

  const handleMemberInputChange = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormState(prevState => ({
      ...prevState,
      familyMembers: updatedMembers,
    }));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(familyMembers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cadastro - Familia');
    XLSX.writeFile(wb, 'Cadastro_Familia.xlsx');
  };

  const printForm = () => {
    document.title = `Cadastro - Família`;
    window.print();
  };

  const data = formState
  console.log(data)

  const formFields = [
    {
      label: 'Endereço',
      name: 'homeAddress',
      type: 'text',
      value: homeAddress,
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
      name: 'residentsQuantity',
      type: 'number',
      value: extraData.residentsQuantity,
      handleChange: handleInputChange,
    },
    {
      label: 'Qt. de cômodos',
      name: 'roomsQuantity',
      type: 'number',
      value: extraData.roomsQuantity,
      handleChange: handleInputChange,
    },
    {
      label: 'Tipo de imóvel',
      name: 'propertyType',
      type: 'select',
      value: extraData.propertyType,
      options: dataItems.propertyTypes,
      handleChange: handleInputChange,
    },
    {
      label: 'Animais?',
      name: 'animalTypes',
      type: 'text',
      value: extraData.animalTypes,
      handleChange: handleInputChange,
      placeholder: "Cachorro, Gato"
    },
    {
      label: 'Quantos?',
      name: 'animalQuantity',
      type: 'number',
      value: extraData.animalQuantity,
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
    formFields,
    familyMembers
  };
};
