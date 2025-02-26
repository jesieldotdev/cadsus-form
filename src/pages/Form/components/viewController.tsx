import dataItems from './data';
import _ from 'lodash'; // Importando lodash para usar o debounce

interface ControllerFormProps {
  index: number;
  removeMember: (index: number) => void;
  handleInputChange: (index: number, field: string, value: string) => void;
  memberData: Member;
}

export const ControllerMemberForm = ({
  handleInputChange,
  index,
  memberData,
  removeMember,
}: ControllerFormProps) => {
  
  // Debounce aplicado diretamente no handleInputChange
  const debouncedHandleInputChange = _.debounce((index: number, field: string, value: string) => {
    handleInputChange(index, field, value);
  }, 500); // Ajuste o tempo de debounce conforme necessário (500ms é um exemplo)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    debouncedHandleInputChange(index, name, value); // Usando o debounce
  };

  const handleSUSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 15) value = value.slice(0, 15); 

    if (value.length === 15) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, '$1.$2.$3.$4'); 
    }

    debouncedHandleInputChange(index, 'sus', value); // Usando o debounce para SUS
  };

  const formFields = [
    {
      label: 'Tipo de Membro',
      name: 'type',
      type: 'select',
      value: memberData.type,
      options: dataItems.memberTypes,
      handleChange,
    },
    {
      label: 'Nome',
      name: 'name',
      type: 'text',
      value: memberData.name,
      handleChange,
    },
    {
      label: 'SUS',
      name: 'sus',
      type: 'text',
      value: memberData.sus,
      handleChange: handleSUSChange,
    },
    {
      label: 'Mãe',
      name: 'mother',
      type: 'text',
      value: memberData.mother,
      handleChange,
    },
    {
      label: 'Pai',
      name: 'father',
      type: 'text',
      value: memberData.father,
      handleChange,
    },
    {
      label: 'Nascimento',
      name: 'dateOfBirth',
      type: 'date',
      value: memberData.dateOfBirth,
      handleChange,
    },
    {
      label: 'Ocupação',
      name: 'occupation',
      type: 'text',
      value: memberData.occupation,
      handleChange,
    },
    {
      label: 'Escolaridade',
      name: 'degreeOfStudy',
      type: 'select',
      value: memberData.degreeOfStudy,
      options: dataItems.scolarity,
      handleChange,
    },
    {
      label: 'Cor',
      name: 'skinTone',
      type: 'select',
      value: memberData.skinTone,
      options: dataItems.skinTones,
      handleChange,
    },
    {
      label: 'Observação',
      name: 'observation',
      type: 'textarea',
      value: memberData.observation,
      handleChange,
    },
  ];

  return {
    formFields,
  };
};
