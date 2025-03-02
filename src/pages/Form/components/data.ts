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

  const yesOrNot = ['Sim', 'Não']
  const healthStatus = ['Abaixo do Peso' , 'Peso Adequado' , 'Acima do Peso']

export default Object.assign({}, {
    memberTypes,
    scolarity,
    skinTones,
    yesOrNot,
    healthStatus
     
  });