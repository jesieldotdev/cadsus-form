import { getNestedField } from "../../utils/utils";
import { getDefaultDomicileItem } from "./utils";

export const getDomicile =
  (state: RootState) =>
  <T extends FlattenKeys<DomicileState>>(field: T) =>
    getNestedField(state.task, field);


  export const getDomicileItem = (state: RootState) => (): DomicileItem => {
    const { items, selectedItemIndex } = state.task;
    return items[selectedItemIndex] ?? getDefaultDomicileItem();
  };