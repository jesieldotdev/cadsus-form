/// <reference types="vite/client" />

declare module 'html-to-pdf-js' {
    export function htmlToPdf(): any;
  }
  

  
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