/// <reference types="vite/client" />

declare module 'html-to-pdf-js' {
    export function htmlToPdf(): any;
  }
  
  type Member = {
    tipo: string | undefined;
    nome: string | undefined;
    sus: string | undefined;
    mae: string | undefined;
    pai: string | undefined;
  };
  
  type Data = {
    homeAddress: string | undefined;
    homePhone: string | undefined;
    residentsQuantity: number | undefined;
    propertyType: string | undefined;
    animalQuantity: number | undefined;
    animalType: string | undefined;
    members: Member[];
    roomsQuantity: number|undefined
  };