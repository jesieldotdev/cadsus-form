type DomicileState = {
  items: DomicileItem[];
  formState: DomicileItem;
  familyMembers: Member[]
  healthForm: HealthForm
  extraData: DomicileExtraForm
  selectedItemIndex: number;
  searchText: string;
  individualModalTable: boolean;
  filter: {
    member?: Member | string;
    domicile?: DomicileItem ;
  };
};

type DomicileItem = {
  id: string;
  homeAddress: string;
  phone: string;
  extraData: DomicileExtraForm;
  familyMembers: Member[];
};

type Member = {
  name: string;
  type: string;
  sus: string;
  dateOfBirth: string;
  skinTone: string;
  father: string;
  mother: string;
  degreeOfStudy: string;
  occupation: string;
  healthInfo: HealthForm;
  naturalFrom: string;
  observation: string;
};

type HealthForm = {
  isPregnant: boolean;
  referenceMaternity: string;
  healthStatus: 'Abaixo do Peso' | 'Peso Adequado' | 'Acima do Peso' | string;
  usesOtherDrugs: boolean;
  hasHypertension: boolean;
  hasDiabetes: boolean;
  hadStroke: boolean;
  hadHeartAttack: boolean;
  hasHeartDisease: boolean;
  heartDiseaseType: 'Insuficiencia Cardiac' | 'Outro' | 'Nao Sabe' | string;
  hasRespiratoryDisease: boolean;
  respiratoryDiseaseType: 'Asma' | 'DPOC / Enfisema' | 'Outro' | 'Nao Sabe' | string;
  isSmoker: boolean;
  usesAlcohol: boolean;
  hasKidneyProblems: boolean;
  kidneyProblemType: 'Insuficiencia Renal' | 'Outro' | 'Nao Sabe' | string;
  hasLeprosy: boolean;
  hasCancer: boolean;
  hasTuberculosis: boolean;
  hadHospitalizationInLast12Months: boolean;
  hospitalizationCause: string;
  hadMentalHealthDiagnosis: boolean;
  isBedridden: boolean;
  usesMedicinalPlants: boolean;
  medicinalPlants: string;
  usesOtherIntegrativePractices: boolean;
  isDomiciled: boolean;
  otherHealthConditions: Array<string>;
};


type DomicileExtraForm = {
  waterSupply: 'Rede encanada até o domicílio' | 'Poço artesiano' | 'Outra' | string;
  waterTreatment: 'Sem tratamento' | 'Com tratamento' | string;
  animalTypes: 'Gato' | 'Cachorro' | 'Passaro' | 'De Criação' | 'Outros' | string;
  hasLivedSince: string;
  residenceType: 'Casa' | 'Apartamento' | 'Outro' | string;
  accessToResidenceType: 'Asfalto' | 'Pavimento' | 'Chão' | 'Batido' | 'Fluvial' | 'Outro' | string;
  predominantConstructionMaterial:
    | 'Alvenaria/Tijolo com Revestimento'
    | 'Alvenaria/Tijolo sem Revestimento'
    | 'Taipa com Revestimento'
    | 'Taipa sem Revestimento'
    | 'Madeira Aparelhada'
    | 'Madeira Aproveitado'
    | 'Palha'
    | 'Outro Material'
    | string;
  electricityAvailability: boolean;
  residentsQuantity: number;
  propertyType: 'Próprio' | 'Alugado' | 'Financiado' | 'Outro' | string;
  animalQuantity: number;
  roomsQuantity: number;
};
