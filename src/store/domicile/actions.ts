
import { setDomicile as setDomicileDomicile } from "./reducer";
import { mockDomicileItem } from './utils'


interface Response {
  message: string;
  domiciles: DomicileItem[]
}

export const setDomicile =
  (...[, , , dispatch]: any) =>
    <T extends FlattenKeys<DomicileState>>(
      field: T,
      value: DeepType<DomicileState, T>
    ): void =>
      dispatch(setDomicileDomicile(field, value));


export const setDomicileItem =
  (getState: () => RootState, actions: ActionsType) =>
    <T extends FlattenKeys<DomicileItem>>(
      field: T,
      value: DeepType<DomicileItem, T>
    ): void => {
      const {
        domicile: { setDomicile },
      } = actions;
      const state = getState();

      const selectedCartItemIndex = state.domicile.selectedItemIndex;
      const selectedItem = state.domicile.items[selectedCartItemIndex];
      if (!selectedItem) return;

      setDomicile(`items.${selectedCartItemIndex}.${field}`, value as any);
    };




export const getDomiciles =
  (getState: () => RootState, actions: ActionsType) =>
    () => {

      const domiciles = mockDomicileItem;


      actions.domicile.setDomicile("items", domiciles);
      return domiciles;
    };


export const getDomicileById =
  (getState: () => RootState, actions: ActionsType) =>
    (id: string) => {

      const state = getState();
      const domicile = state.domicile.items.find(item => item.id === id);

      if (domicile) {
        console.log('Domicílio encontrado:', domicile);
        return domicile;
      } else {
        console.log('Domicílio não encontrado.');
        return null;
      }
    };

export const getMemberBySUS =
  (getState: () => RootState) =>
    (sus: string) => {
      const state = getState();

      
      for (let domicile of state.domicile.items) {
        const member = domicile.familyMembers.find(member => member.sus === sus);
        if (member) {
          console.log('Membro encontrado:', member);
          return member; 
        }
      }

      console.log('Membro não encontrado.');
      return null; 
    };


    export const getDomicileBySUS =
  (getState: () => RootState, actions: ActionsType) =>
  (sus: string): DomicileItem | null => {
    const state = getState(); 

    
    for (let domicile of state.domicile.items) {
      const member = domicile.familyMembers.find(member => member.sus === sus);
      if (member) {
        console.log('Domicílio encontrado para o SUS:', domicile);
        return domicile; 
      }
    }

    console.log('Domicílio não encontrado para o SUS.');
    return null; 
  };
