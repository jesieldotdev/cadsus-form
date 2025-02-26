import dataItems from './data'

interface ControllerFormProps{
    index: number;
    removeMember: (index: number) => void;
    handleInputChange: (index: number, field: string, value: string) => void;
    memberData: any;
}

export const ControllerMemberForm = ({handleInputChange,index,memberData,removeMember}:ControllerFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        handleInputChange(index, e.target.name, e.target.value);
      };
    
      const handleSUSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); 
        if (value.length > 15) value = value.slice(0, 15); 
    
        if (value.length === 15) {
          value = value.replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, '$1.$2.$3.$4'); 
        }
    
        handleInputChange(index, 'sus', value);
      };
    
      const handleDateBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleInputChange(index, 'nascimento', value);
      };
    
 

      const formFields = [
        {
          label: 'Tipo de Membro',
          name: 'tipo',
          type: 'select',
          value: memberData.tipo,
          options: dataItems.memberTypes,
          handleChange,
        },
        {
          label: 'Nome',
          name: 'nome',
          type: 'text',
          value: memberData.nome,
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
          name: 'mae',
          type: 'text',
          value: memberData.mae,
          handleChange,
        },
        {
          label: 'Pai',
          name: 'pai',
          type: 'text',
          value: memberData.pai,
          handleChange,
        },
        {
          label: 'Nascimento',
          name: 'nascimento',
          type: 'date',
          value: memberData.nascimento,
          handleChange: handleDateBirthChange,
        },
        {
          label: 'Ocupação',
          name: 'ocupacao',
          type: 'text',
          value: memberData.ocupacao,
          handleChange,
        },
        {
          label: 'Escolaridade',
          name: 'escolaridade',
          type: 'select',
          value: memberData.escolaridade,
          options: dataItems.scolarity,
          handleChange,
        },
        {
          label: 'Cor',
          name: 'cor',
          type: 'select',
          value: memberData.cor,
          options: dataItems.skinTones,
          handleChange,
        },
        {
          label: 'Observação',
          name: 'observacao',
          type: 'textarea',
          value: memberData.observacao,
          handleChange,
        },
      ];

    return {
        handleChange,
        formFields
    }
}