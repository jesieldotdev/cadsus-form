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

    return {
        scolarity,
        memberTypes,
        handleDateBirthChange,
        handleSUSChange,
        handleChange,
        skinTones,
        memberData,
        removeMember
    }
}