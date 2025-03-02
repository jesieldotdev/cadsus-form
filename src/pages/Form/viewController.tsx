import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import dataItems from './data';
import useStore from '../../hooks/useStore';
import { defaultMemberInfo } from '../../store/domicile/utils';
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
import { enqueueSnackbar } from 'notistack';


export const ControllerForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [, actions, select] = useStore();
  const { domicile: { setDomicile, addDomicileItem } } = actions;

  function addData(){
    const d: DomicileItem = {
      "id": "1369d6f2-9c80-4139-9bea-880952e6eb17",
      "homeAddress": "Rua Exemplo, 123",
      "phone": "0000000000",
      "extraData": {
          "waterSupply": "Rede pública",
          "waterTreatment": "Filtragem",
          "animalTypes": "Cães e gatos",
          "hasLivedSince": "2015-06-10",
          "residenceType": "Apartamento",
          "accessToResidenceType": "Asfalto",
          "predominantConstructionMaterial": "Concreto",
          "electricityAvailability": true,
          "residentsQuantity": 4,
          "propertyType": "Próprio",
          "animalQuantity": "2",
          "roomsQuantity": "5"
      },
      "familyMembers": [
          {
              "id": "49f51a6e-3312-43a9-99b4-68feafd5bc16",
              "name": "NAIARA ALMEIDA DA SILVA",
              "type": "CÔNJUGE",
              "sus": "NAIARA ALMEIDA DA SILVA",
              "dateOfBirth": "",
              "skinTone": "",
              "father": "",
              "mother": "F",
              "degreeOfStudy": "",
              "occupation": "",
              "healthInfo": {
                  "isPregnant": "NÃO",
                  "referenceMaternity": "",
                  "healthStatus": "",
                  "usesOtherDrugs": false,
                  "hasHypertension": false,
                  "hasDiabetes": false,
                  "hadStroke": false,
                  "hadHeartAttack": false,
                  "hasHeartDisease": false,
                  "heartDiseaseType": "",
                  "hasRespiratoryDisease": false,
                  "respiratoryDiseaseType": "",
                  "isSmoker": false,
                  "usesAlcohol": false,
                  "hasKidneyProblems": false,
                  "kidneyProblemType": "",
                  "hasLeprosy": false,
                  "hasCancer": false,
                  "hasTuberculosis": false,
                  "hadHospitalizationInLast12Months": false,
                  "hospitalizationCause": "",
                  "hadMentalHealthDiagnosis": false,
                  "isBedridden": false,
                  "usesMedicinalPlants": false,
                  "medicinalPlants": "",
                  "usesOtherIntegrativePractices": false,
                  "isDomiciled": false,
                  "otherHealthConditions": []
              },
              "naturalFrom": "",
              "observation": ""
          },
          {
              "id": "2290db74-dc64-450a-ad7a-05a2d46fdd85",
              "name": "LIZ MACEDO DA SILVA",
              "type": "FILHO(A)",
              "sus": "LIZ MACEDO DA SILVA",
              "dateOfBirth": "",
              "skinTone": "",
              "father": "",
              "mother": "F",
              "degreeOfStudy": "",
              "occupation": "",
              "healthInfo": {
                  "isPregnant": "NÃO",
                  "referenceMaternity": "",
                  "healthStatus": "",
                  "usesOtherDrugs": false,
                  "hasHypertension": false,
                  "hasDiabetes": false,
                  "hadStroke": false,
                  "hadHeartAttack": false,
                  "hasHeartDisease": false,
                  "heartDiseaseType": "",
                  "hasRespiratoryDisease": false,
                  "respiratoryDiseaseType": "",
                  "isSmoker": false,
                  "usesAlcohol": false,
                  "hasKidneyProblems": false,
                  "kidneyProblemType": "",
                  "hasLeprosy": false,
                  "hasCancer": false,
                  "hasTuberculosis": false,
                  "hadHospitalizationInLast12Months": false,
                  "hospitalizationCause": "",
                  "hadMentalHealthDiagnosis": false,
                  "isBedridden": false,
                  "usesMedicinalPlants": false,
                  "medicinalPlants": "",
                  "usesOtherIntegrativePractices": false,
                  "isDomiciled": false,
                  "otherHealthConditions": []
              },
              "naturalFrom": "",
              "observation": ""
          },
          {
              "id": "ee6bfe5f-f231-43c0-abbf-f29bb2dea985",
              "name": "MANUELA MACEDO DA SILVA",
              "type": "FILHO(A)",
              "sus": "MANUELA MACEDO DA SILVA",
              "dateOfBirth": "",
              "skinTone": "",
              "father": "",
              "mother": "F",
              "degreeOfStudy": "",
              "occupation": "",
              "healthInfo": {
                  "isPregnant": "NÃO",
                  "referenceMaternity": "",
                  "healthStatus": "",
                  "usesOtherDrugs": false,
                  "hasHypertension": false,
                  "hasDiabetes": false,
                  "hadStroke": false,
                  "hadHeartAttack": false,
                  "hasHeartDisease": false,
                  "heartDiseaseType": "",
                  "hasRespiratoryDisease": false,
                  "respiratoryDiseaseType": "",
                  "isSmoker": false,
                  "usesAlcohol": false,
                  "hasKidneyProblems": false,
                  "kidneyProblemType": "",
                  "hasLeprosy": false,
                  "hasCancer": false,
                  "hasTuberculosis": false,
                  "hadHospitalizationInLast12Months": false,
                  "hospitalizationCause": "",
                  "hadMentalHealthDiagnosis": false,
                  "isBedridden": false,
                  "usesMedicinalPlants": false,
                  "medicinalPlants": "",
                  "usesOtherIntegrativePractices": false,
                  "isDomiciled": false,
                  "otherHealthConditions": []
              },
              "naturalFrom": "",
              "observation": ""
          },
          {
              "id": "65b7f1b0-46a7-4c6c-aef3-725499efbc00",
              "name": "ELDED MACEDO SILVA",
              "type": "RESPONSÁVEL",
              "sus": "ELDED MACEDO SILVA",
              "dateOfBirth": "244093",
              "skinTone": "",
              "father": "",
              "mother": "M",
              "degreeOfStudy": "",
              "occupation": "",
              "healthInfo": {
                  "isPregnant": "SIM",
                  "referenceMaternity": "",
                  "healthStatus": "",
                  "usesOtherDrugs": false,
                  "hasHypertension": false,
                  "hasDiabetes": false,
                  "hadStroke": false,
                  "hadHeartAttack": false,
                  "hasHeartDisease": false,
                  "heartDiseaseType": "",
                  "hasRespiratoryDisease": false,
                  "respiratoryDiseaseType": "",
                  "isSmoker": false,
                  "usesAlcohol": false,
                  "hasKidneyProblems": false,
                  "kidneyProblemType": "",
                  "hasLeprosy": false,
                  "hasCancer": false,
                  "hasTuberculosis": false,
                  "hadHospitalizationInLast12Months": false,
                  "hospitalizationCause": "",
                  "hadMentalHealthDiagnosis": false,
                  "isBedridden": false,
                  "usesMedicinalPlants": false,
                  "medicinalPlants": "",
                  "usesOtherIntegrativePractices": false,
                  "isDomiciled": false,
                  "otherHealthConditions": []
              },
              "naturalFrom": "",
              "observation": ""
          }
      ],
      "healthForm": {
          "isPregnant": false,
          "referenceMaternity": "",
          "healthStatus": "",
          "usesOtherDrugs": false,
          "hasHypertension": false,
          "hasDiabetes": false,
          "hadStroke": false,
          "hadHeartAttack": false,
          "hasHeartDisease": false,
          "heartDiseaseType": "",
          "hasRespiratoryDisease": false,
          "respiratoryDiseaseType": "",
          "isSmoker": false,
          "usesAlcohol": false,
          "hasKidneyProblems": false,
          "kidneyProblemType": "",
          "hasLeprosy": false,
          "hasCancer": false,
          "hasTuberculosis": false,
          "hadHospitalizationInLast12Months": false,
          "hospitalizationCause": "",
          "hadMentalHealthDiagnosis": false,
          "isBedridden": false,
          "usesMedicinalPlants": false,
          "medicinalPlants": "",
          "usesOtherIntegrativePractices": false,
          "isDomiciled": false,
          "otherHealthConditions": []
      }
  }
  
    addDomicileItem(d)
  }

  addData()

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
  }, 1000);

  // Efeito para sincronizar formState
  useEffect(() => {
    if (!_.isEqual(localFormState, formState)) {
      debouncedSetDomicile(localFormState);
    }
    return () => {
      debouncedSetDomicile.cancel();
    };
  }, [localFormState, formState]);


  useEffect(() => {
    if (!_.isEqual(localExtraDataState, extraDataState)) {
      setDomicile('extraData', { ...localExtraDataState }); // Faz uma cópia para evitar referência direta
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
    console.log(name, value)

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
      ...prevState, // Cópia do objeto
      [name]: value // Atualizando o campo diretamente
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
      familyMembers: [
        ...prevState.familyMembers,
        { ...defaultMemberInfo, id: uuidv4() } // Gera um ID único para o novo membro
      ]
    }));
  };

  const removeMember = (index: number) => {
    setLocalFormState(prevState => ({
      ...prevState,
      familyMembers: prevState.familyMembers.filter((_, i) => i !== index),
    }));
  };

  const handleMemberInputChange = (index: number, field: string, value: string) => {
    console.log(`Atualizando ${field}:`, value, "no membro de índice", index);
  
    setLocalFormState((prevState) => {
      const updatedMembers = prevState.familyMembers.map((member, i) => {
        if (i === index) {
          // Se for um campo de healthInfo, atualiza corretamente
          if (field.startsWith("healthInfo.")) {
            return {
              ...member,
              healthInfo: {
                ...member.healthInfo,
                [field.replace("healthInfo.", "")]: value,
              },
            };
          } 
          // Se for um campo normal, atualiza diretamente
          else {
            return {
              ...member,
              [field]: value,
            };
          }
        }
        return member;
      });
  
      return {
        ...prevState,
        familyMembers: updatedMembers,
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


  function handleSave() {
    setLoading(true);
  
    // Criar um ID único
    const updatedFormState = {
      ...localFormState,
      id: uuidv4(),
      extraData: { ...localExtraDataState },  // Garante que extraData está atualizado
      healthForm: { ...localHealthState },   // Garante que healthForm também está atualizado
    };
  
    console.log("Salvando...", updatedFormState);
  
    // Atualizar estado global antes de adicionar
    setDomicile("formState", updatedFormState);
    setDomicile("extraData", updatedFormState.extraData);
    setDomicile("healthForm", updatedFormState.healthForm);
  
    // Adicionar o item atualizado
    addDomicileItem(updatedFormState);
  
    setLoading(false);
    enqueueSnackbar("Salvo com sucesso!", { variant: "success" });
  }
  
  

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
    addDomicileItem,
    handleSave,
    loading
  };
};

