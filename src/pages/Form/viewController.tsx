import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import dataItems from './data';
import useStore from '../../hooks/useStore';
import { defaultMemberInfo } from '../../store/domicile/utils';
import _ from "lodash";


export const ControllerForm = () => {
  const [, actions, select] = useStore();
  const { domicile: { setDomicile, addDomicileItem } } = actions;

  // Dividindo o estado
  const formState = select('domicile.formState');
  const extraDataState = select('domicile.extraData');
  const healthState = select('domicile.healthForm');
  const familyMembersState = select('domicile.familyMembers');

  // Estados locais separados
  const [localFormState, setLocalFormState] = useState(formState);
  const [localExtraDataState, setLocalExtraDataState] = useState(extraDataState);
  const [localHealthState, setLocalHealthState] = useState(healthState);

  // Debounce para salvar o estado
  const debouncedSetDomicile = _.debounce((updatedState) => {
    setDomicile('formState', updatedState);
  }, 4000);

  // Efeito para sincronizar formState
  useEffect(() => {
    if (!_.isEqual(localFormState, formState)) {
      debouncedSetDomicile(localFormState);
    }
    return () => {
      debouncedSetDomicile.cancel();
    };
  }, [localFormState, formState]);

  // Lógica similar para extraData e healthState
  useEffect(() => {
    if (!_.isEqual(localExtraDataState, extraDataState)) {
      setDomicile('extraData', localExtraDataState);
    }
  }, [localExtraDataState, extraDataState]);

  useEffect(() => {
    if (!_.isEqual(localHealthState, healthState)) {
      setDomicile('healthForm', localHealthState);
    }
  }, [localHealthState, healthState]);


  // Manipuladores de entrada



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setLocalFormState(prevState => {
      const updatedState = { ...prevState };
  
      // Se o campo pertence ao objeto healthInfo, armazenamos corretamente
      if (name.startsWith("healthInfo.")) {
        _.set(updatedState, name, value);
      } else {
        updatedState[name] = value;
      }
  
      return updatedState;
    });
  };
  
  
  


  const handleExtraDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalExtraDataState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleHealthChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalHealthState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addMember = () => {
    setLocalFormState(prevState => ({
      ...prevState,
      familyMembers: prevState.familyMembers.length === 0 
        ? [defaultMemberInfo] // Se a lista estiver vazia, adiciona o membro padrão
        : [...prevState.familyMembers, defaultMemberInfo] // Caso contrário, adiciona ao final
    }));
  };

  const removeMember = (index: number) => {
    setLocalFormState(prevState => ({
      ...prevState,
      familyMembers: prevState.familyMembers.filter((_, i) => i !== index),
    }));
  };

  const handleMemberInputChange = (index: number, field: string, value: string) => {
    setLocalFormState(prevState => {
      const updatedMembers = [...prevState.familyMembers];
  
      // Utilizando lodash para permitir a manipulação de campos aninhados
      _.set(updatedMembers[index], field, value);
  
      return {
        ...prevState,
        familyMembers: updatedMembers
      };
    });
  };
  

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(localFormState.familyMembers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cadastro - Familia');
    XLSX.writeFile(wb, 'Cadastro_Familia.xlsx');
  };

  const printForm = () => {
    document.title = `Cadastro - Família`;
    window.print();
  };

  // Formulários dinâmicos
  const formFields = [
    {
      label: 'Endereço',
      name: 'homeAddress',
      type: 'text',
      value: localFormState.homeAddress,
      handleChange: handleInputChange,
      placeholder: "Rua qualquer, n77..."
    },
    {
      label: 'Tel. Contato',
      name: 'phone',
      type: 'tel',
      value: localFormState.phone,
      handleChange: handleInputChange,
      placeholder: "99 99999-9999"
    },
    {
      label: 'Tipo de imóvel',
      name: 'propertyType',
      type: 'select',
      value: localExtraDataState.propertyType,
      options: dataItems.propertyTypes,
      handleChange: handleExtraDataChange,
    },
    {
      label: 'Reside desde',
      name: 'hasLivedSince',
      type: 'date',
      value: localExtraDataState.hasLivedSince,
      handleChange: handleExtraDataChange,
    },
    {
      label: 'Qt. de moradores',
      name: 'residentsQuantity',
      type: 'number',
      value: localExtraDataState.residentsQuantity,
      handleChange: handleExtraDataChange,
    },
    {
      label: 'Qt. de cômodos',
      name: 'roomsQuantity',
      type: 'number',
      value: localExtraDataState.roomsQuantity,
      handleChange: handleExtraDataChange,
    },
    {
      label: 'Animais?',
      name: 'animalTypes',
      type: 'text',
      value: localExtraDataState.animalTypes,
      handleChange: handleExtraDataChange,
      placeholder: "Cachorro, Gato"
    },
    {
      label: 'Quantos?',
      name: 'animalQuantity',
      type: 'number',
      value: localExtraDataState.animalQuantity,
      handleChange: handleExtraDataChange,
    },
  ];

  const extraDataFields = [
  
 {}
  
   
  ];

  return {
    dataItems,
    formState: localFormState,
    addMember,
    removeMember,
    handleMemberInputChange,
    handleInputChange,
    exportToExcel,
    printForm,
    formFields,
    extraDataFields,
    familyMembersState: localFormState.familyMembers,
    addDomicileItem
  };
};

