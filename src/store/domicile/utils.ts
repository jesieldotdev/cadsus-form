export const getDefaultDomicileItem = (): DomicileItem => ({
  id: '0',
  homeAddress: '',
  phone: '',
  extraData: {
    waterSupply: '',
    waterTreatment: '',
    animalTypes: '',
    hasLivedSince: '',
    residenceType: '',
    accessToResidenceType: '',
    predominantConstructionMaterial: '',
    electricityAvailability: false,
    residentsQuantity: 0,
    propertyType: '',
    animalQuantity: 0,
    roomsQuantity: 0
  },
  familyMembers: []
});


export const defaultHealthInfo: HealthForm = {
  isPregnant: false,
  referenceMaternity: '',
  healthStatus: '', // Ou você pode deixar 'Peso Adequado' como valor inicial, se preferir
  usesOtherDrugs: false,
  hasHypertension: false,
  hasDiabetes: false,
  hadStroke: false,
  hadHeartAttack: false,
  hasHeartDisease: false,
  heartDiseaseType: '', // Ou 'Nao Sabe', caso queira definir um valor padrão
  hasRespiratoryDisease: false,
  respiratoryDiseaseType: '', // Ou 'Nao Sabe'
  isSmoker: false,
  usesAlcohol: false,
  hasKidneyProblems: false,
  kidneyProblemType: '', // Ou 'Nao Sabe'
  hasLeprosy: false,
  hasCancer: false,
  hasTuberculosis: false,
  hadHospitalizationInLast12Months: false,
  hospitalizationCause: '',
  hadMentalHealthDiagnosis: false,
  isBedridden: false,
  usesMedicinalPlants: false,
  medicinalPlants: '',
  usesOtherIntegrativePractices: false,
  isDomiciled: false,
  otherHealthConditions: []
};

export const defaultMemberInfo: Member = {
  id:'',
  name: '',
  type: '',
  sus: '',
  dateOfBirth: '',
  skinTone: '',
  father: '',
  mother: '',
  degreeOfStudy: '',
  occupation: '',
  healthInfo: defaultHealthInfo, // Utiliza o valor padrão de HealthForm
  naturalFrom: '',
  observation: ''
};

export const defaultExtraData = {
  waterSupply: '', // String vazia caso não tenha essa informação
  waterTreatment: '', // String vazia caso não tenha essa informação
  animalTypes: '', // String vazia caso não tenha essa informação
  hasLivedSince: '', // String vazia caso não tenha essa informação
  residenceType: '', // String vazia caso não tenha essa informação
  accessToResidenceType: '', // String vazia caso não tenha essa informação
  predominantConstructionMaterial: '', // String vazia caso não tenha essa informação
  electricityAvailability: false, // Ou true, caso tenha eletricidade disponível
  residentsQuantity: 1, // Número padrão de moradores
  propertyType: '', // String vazia caso não tenha essa informação
  animalQuantity: 0, // Quantidade de animais
  roomsQuantity: 1 // Quantidade padrão de cômodos
};



export const mockDomicileItem: DomicileItem[] = [
  {
    "id": "0",
    "homeAddress": "Rua das Flores, 123",
    "phone": "9876-5432",
    "extraData": {
      "waterSupply": "Rede encanada até o domicílio",
      "waterTreatment": "Com tratamento",
      "animalTypes": ["Cachorro", "Gato"],
      "hasLivedSince": "2015",
      "residenceType": "Casa",
      "accessToResidenceType": "Asfalto",
      "predominantConstructionMaterial": "Alvenaria/Tijolo com Revestimento",
      "electricityAvailability": true,
      "residentsQuantity": 4,
      "propertyType": "Próprio",
      "animalQuantity": 2,
      "roomsQuantity": 5
    },
    "familyMembers": [
      {
        "name": "João Silva",
        "type": "Pai",
        "sus": "123456789",
        "father": "Carlos Silva",
        "mother": "Maria Silva",
        "degreeOfStudy": "Ensino Superior",
        "occupation": "Engenheiro",
        "healthInfo": {
          "isPregnant": false,
          "referenceMaternity": '',
          "healthStatus": "Peso Adequado",
          "usesOtherDrugs": false,
          "hasHypertension": false,
          "hasDiabetes": false,
          "hadStroke": false,
          "hadHeartAttack": false,
          "hasHeartDisease": false,
          "heartDiseaseType": '',
          "hasRespiratoryDisease": false,
          "respiratoryDiseaseType": '',
          "isSmoker": false,
          "usesAlcohol": true,
          "hasKidneyProblems": false,
          "kidneyProblemType": '',
          "hasLeprosy": false,
          "hasCancer": false,
          "hasTuberculosis": false,
          "hadHospitalizationInLast12Months": false,
          "hospitalizationCause": '',
          "hadMentalHealthDiagnosis": false,
          "isBedridden": false,
          "usesMedicinalPlants": false,
          "medicinalPlants": '',
          "usesOtherIntegrativePractices": false,
          "isDomiciled": true,
          "otherHealthConditions": []
        }
      }
    ]
  },
  {
    "id": "1",
    "homeAddress": "Av. Central, 456",
    "phone": "8765-4321",
    "extraData": {
      "waterSupply": "Poço artesiano",
      "waterTreatment": "Sem tratamento",
      "animalTypes": ["Passaro"],
      "hasLivedSince": "2010",
      "residenceType": "Apartamento",
      "accessToResidenceType": "Pavimento",
      "predominantConstructionMaterial": "Madeira Aparelhada",
      "electricityAvailability": true,
      "residentsQuantity": 3,
      "propertyType": "Alugado",
      "animalQuantity": 1,
      "roomsQuantity": 4
    },
    "familyMembers": [
      {
        "name": "Maria Oliveira",
        "type": "Mãe",
        "sus": "987654321",
        "father": "Roberto Oliveira",
        "mother": "Ana Oliveira",
        "degreeOfStudy": "Ensino Médio",
        "occupation": "Professor",
        "healthInfo": {
          "isPregnant": false,
          "referenceMaternity": '',
          "healthStatus": "Abaixo do Peso",
          "usesOtherDrugs": true,
          "hasHypertension": false,
          "hasDiabetes": true,
          "hadStroke": false,
          "hadHeartAttack": false,
          "hasHeartDisease": false,
          "heartDiseaseType": '',
          "hasRespiratoryDisease": true,
          "respiratoryDiseaseType": "Asma",
          "isSmoker": true,
          "usesAlcohol": true,
          "hasKidneyProblems": false,
          "kidneyProblemType": '',
          "hasLeprosy": false,
          "hasCancer": false,
          "hasTuberculosis": false,
          "hadHospitalizationInLast12Months": true,
          "hospitalizationCause": "Pneumonia",
          "hadMentalHealthDiagnosis": true,
          "isBedridden": false,
          "usesMedicinalPlants": false,
          "medicinalPlants": '',
          "usesOtherIntegrativePractices": false,
          "isDomiciled": true,
          "otherHealthConditions": ["Hipotireoidismo"]
        }
      }
    ]
  },
  {
    "id": "2",
    "homeAddress": "Rua do Sol, 789",
    "phone": "7654-3210",
    "extraData": {
      "waterSupply": "Outra",
      "waterTreatment": "Com tratamento",
      "animalTypes": ["De Criação"],
      "hasLivedSince": "2020",
      "residenceType": "Casa",
      "accessToResidenceType": "Chão",
      "predominantConstructionMaterial": "Taipa com Revestimento",
      "electricityAvailability": false,
      "residentsQuantity": 5,
      "propertyType": "Financiado",
      "animalQuantity": 3,
      "roomsQuantity": 6
    },
    "familyMembers": [
      {
        "name": "Pedro Souza",
        "type": "Filho",
        "sus": "192837465",
        "father": "Gustavo Souza",
        "mother": "Claudia Souza",
        "degreeOfStudy": "Ensino Fundamental",
        "occupation": "Estudante",
        "healthInfo": {
          "isPregnant": false,
          "referenceMaternity": '',
          "healthStatus": "Peso Adequado",
          "usesOtherDrugs": false,
          "hasHypertension": false,
          "hasDiabetes": false,
          "hadStroke": false,
          "hadHeartAttack": false,
          "hasHeartDisease": false,
          "heartDiseaseType": '',
          "hasRespiratoryDisease": false,
          "respiratoryDiseaseType": '',
          "isSmoker": false,
          "usesAlcohol": false,
          "hasKidneyProblems": false,
          "kidneyProblemType": '',
          "hasLeprosy": false,
          "hasCancer": false,
          "hasTuberculosis": false,
          "hadHospitalizationInLast12Months": false,
          "hospitalizationCause": '',
          "hadMentalHealthDiagnosis": false,
          "isBedridden": false,
          "usesMedicinalPlants": false,
          "medicinalPlants": '',
          "usesOtherIntegrativePractices": false,
          "isDomiciled": true,
          "otherHealthConditions": []
        }
      }
    ]
  }
]

