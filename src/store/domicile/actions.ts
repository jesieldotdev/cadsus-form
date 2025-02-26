import { AxiosResponse } from "axios";
import { setDomicile as setDomicileDomicile } from "./reducer";
import { stringify } from "querystring";

interface Response {
  message: string;
  tasks: DomicileItem[]
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
        task: { setDomicile },
      } = actions;
      const state = getState();

      const selectedCartItemIndex = state.task.selectedItemIndex;
      const selectedItem = state.task.items[selectedCartItemIndex];
      if (!selectedItem) return;

      setDomicile(`items.${selectedCartItemIndex}.${field}`, value as any);
    };


// export const getDomiciles =
//   (_getState: () => RootState, actions: ActionsType) =>
//     (searchFilter?: SearchFilter<DomicileItem>) =>
//       new Promise<AxiosResponse<Response>>((resolve, reject) => {
//         const {
//           request: { GET },
//         } = actions;
//         GET
//           <Response>("tasks")
//           .then(resolve)
//           .catch((error) => {
//             console.error("Error in getDomiciles:", error);
//             reject(error);
//           });
//       });

// export const filterDomiciles =
//   (getState: () => RootState, actions: ActionsType) => () =>
//     new Promise<Response>((resolve, reject) => {
//       const {
//         task: { getDomiciles, setDomicile },
//       } = actions;
//       const state = getState();
//       const searchFilter = state.task.filter.task.filter;


//       getDomiciles(searchFilter)
//         .then(({ data }) => {
//           setDomicile("items", data.tasks);
//           resolve(data);
//         })
//         .catch((error) => {
//           console.error("Error in filterDomiciles:", error);
//           reject(error);
//         });
//     });


