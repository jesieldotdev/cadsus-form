import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import dataItems from './data';
import useStore from '../../hooks/useStore';
import debounce from 'lodash/debounce'; // Importa debounce do lodash

export const ControllerForm = () => {
  const [, actions, select] = useStore();
  const { domicile: { setDomicile } } = actions;

  const formState = select('domicile.formState');
  
  const [localState, setLocalState] = useState<DomicileItem>(formState);

  // Debounced function to sync local state with global state
  const debouncedSetDomicile = debounce((updatedState: DomicileItem) => {
    setDomicile('formState', updatedState);
  }, 4000); // O delay é de 500ms, ajustável conforme necessário.

  // UseEffect to update global state with debounce
  useEffect(() => {
    debouncedSetDomicile(localState); // Só chama quando o debounce finaliza
    return () => {
      debouncedSetDomicile.cancel(); // Cancela o debounce quando o componente é desmontado
    };
  }, [localState]); // Sempre que localState mudar, a função debounced é chamada

  const { familyMembers, extraData, homeAddress, phone } = localState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addMember = () => {
    setLocalState(prevState => ({
      ...prevState,
      familyMembers: [
        ...familyMembers,
        { type: '', name: '', sus: '', mother: '', father: '', naturalFrom: '', occupation: '', degreeOfStudy: '', observation: '', skinTone: '', dateOfBirth: '', healthInfo: undefined }
      ]
    }));
  };

  const removeMember = (index: number) => {
    setLocalState(prevState => ({
      ...prevState,
      familyMembers: familyMembers.filter((_, i) => i !== index),
    }));
  };

  const handleMemberInputChange = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setLocalState(prevState => ({
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
    formState: localState, // Retorna o estado local
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
