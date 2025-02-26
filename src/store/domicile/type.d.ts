type DomicileState = {
  items: DomicileItem[];
  selectedItemIndex: number;
  searchText: string;
  individualModalTable: boolean;
};

type DomicileItem = {
  homeAddress: string | undefined;
  phone: string;
  extraData: DomicileExtraForm;
  familyMembers: Member[];
};

type Member = {
  name: string | undefined;
  type: string | undefined;
  sus: string | undefined;
  father: string | undefined;
  mother: string | undefined;
  degreeOfStudy: string | undefined;
  occupation: string | undefined;
  healthInfo: HealthForm;
};

type HealthForm = {
  isPregnant: boolean;
  referenceMaternity: string | undefined;
  healthStatus: 'Abaixo do Peso' | 'Peso Adequado' | 'Acima do Peso' | undefined;
  usesOtherDrugs: boolean;
  hasHypertension: boolean;
  hasDiabetes: boolean;
  hadStroke: boolean;
  hadHeartAttack: boolean;
  hasHeartDisease: boolean;
  heartDiseaseType: 'Insuficiencia Cardiac' | 'Outro' | 'Nao Sabe' | undefined;
  hasRespiratoryDisease: boolean;
  respiratoryDiseaseType: 'Asma' | 'DPOC / Enfisema' | 'Outro' | 'Nao Sabe' | undefined;
  isSmoker: boolean;
  usesAlcohol: boolean;
  hasKidneyProblems: boolean;
  kidneyProblemType: 'Insuficiencia Renal' | 'Outro' | 'Nao Sabe' | undefined;
  hasLeprosy: boolean;
  hasCancer: boolean;
  hasTuberculosis: boolean;
  hadHospitalizationInLast12Months: boolean;
  hospitalizationCause: string | undefined;
  hadMentalHealthDiagnosis: boolean;
  isBedridden: boolean;
  usesMedicinalPlants: boolean;
  medicinalPlants: string | undefined;
  usesOtherIntegrativePractices: boolean;
  isDomiciled: boolean;
  otherHealthConditions: Array<string | undefined>;
};

type DomicileExtraForm = {
  waterSupply: 'Rede encanada até o domicílio' | 'Poço artesiano' | 'Outra' | undefined;
  waterTreatment: 'Sem tratamento' | 'Com tratamento' | undefined;
  animalTypes: ('Gato' | 'Cachorro' | 'Passaro' | 'De Criação' | 'Outros')[];
  hasLivedSince: string | undefined;
  residenceType: 'Casa' | 'Apartamento' | 'Outro' | undefined;
  accessToResidenceType: 'Asfalto' | 'Pavimento' | 'Chão' | 'Batido' | 'Fluvial' | 'Outro' | undefined;
  predominantConstructionMaterial:
    | 'Alvenaria/Tijolo com Revestimento'
    | 'Alvenaria/Tijolo sem Revestimento'
    | 'Taipa com Revestimento'
    | 'Taipa sem Revestimento'
    | 'Madeira Aparelhada'
    | 'Madeira Aproveitado'
    | 'Palha'
    | 'Outro Material'
    | undefined;
  electricityAvailability: boolean;
  residentsQuantity: number | undefined;
  propertyType: 'Próprio' | 'Alugado' | 'Financiado' | 'Outro' | undefined;
  animalQuantity: number | undefined;
  roomsQuantity: number | undefined;
};
