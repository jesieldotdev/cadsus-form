
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
    

      export const getMemberById =
  (getState: () => RootState, actions: ActionsType) =>
  (domicileId: string, memberId: string) => {
    
    const state = getState();
    const domicile = state.domicile.items.find(item => item.id === domicileId);

    if (domicile) {
      
      const member = domicile.familyMembers.find(member => member.sus === memberId);
      if (member) {
        console.log('Membro encontrado:', member);
        return member; 
      } else {
        console.log('Membro não encontrado.');
        return null;
      }
    } else {
      console.log('Domicílio não encontrado.');
      return null;
    }
  };
