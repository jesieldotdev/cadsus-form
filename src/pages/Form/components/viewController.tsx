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
    
      const memberTypes = [
        'Responsável', 'Irmão/irmã', 'Pai', 'Mãe', 'Filho(a)', 'Genro/Nora', 'Cônjuge', 'Neto(a)/Bisneto(a)', 'Sogro(a)', 'Enteado(a)', 'Outro'
      ];
    
      const scolarity = [
        "ALFABETIZAÇÃO PARA ADULTOS (MOBRAL, ETC)",
        "CLASSE DE ALFABETIZAÇÃO - CA",
        "CRECHE",
        "ENSINO FUNDAMENTAL COMPLETO",
        "ENSINO FUNDAMENTAL EJA - SÉRIES FINAIS (SUPLETIVO 5ª a 9ª)",
        "ENSINO FUNDAMENTAL EJA - SÉRIES INICIAIS (SUPLETIVO 1ª a 4ª)",
        "ENSINO FUNDAMENTAL ESPECIAL",
        "ENSINO FUNDAMENTAL 1ª a 4ª SÉRIES",
        "ENSINO FUNDAMENTAL 5ª a 9ª SÉRIES",
        "ENSINO MÉDIO EJA (SUPLETIVO)",
        "ENSINO MÉDIO ESPECIAL",
        "ENSINO MÉDIO, MÉDIO 2º CICLO (CIENTÍFICO, TÉCNICO E ETC)",
        "FUNDAMENTAL 1A A 4A COMPLETO",
        "NENHUM",
        "PRÉ-ESCOLA (EXCETO CA)",
        "SUPERIOR, APERFEIÇOAMENTO, ESPECIALIZAÇÃO, MESTRADO, DOUTORADO"
      ];
    
      const skinTones = ["Branco", "Preto", "Pardo", "Amarelo", "Indigena"];

      const formFields = [
        {
          label: 'Tipo de Membro',
          name: 'tipo',
          type: 'select',
          value: memberData.tipo,
          options: memberTypes,
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
          options: scolarity,
          handleChange,
        },
        {
          label: 'Cor',
          name: 'cor',
          type: 'select',
          value: memberData.cor,
          options: skinTones,
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
        scolarity,
        memberTypes,
        handleDateBirthChange,
        handleSUSChange,
        handleChange,
        skinTones,
        memberData,
        removeMember,
        formFields
    }
}