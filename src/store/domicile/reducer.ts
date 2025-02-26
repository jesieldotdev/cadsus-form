import { createAction, createReducer } from "@reduxjs/toolkit";
import { initialDomicileState as initialState } from "./state";
import { setNestedField } from "../../utils/utils";


export const setDomicileAction = createAction<{
  field: FlattenKeys<DomicileState>;
  value: any;
}>("SET_TASK")

export const setDomicile =
  <T extends FlattenKeys<DomicileState>>(field: T, value: DeepType<DomicileState, T>) =>
    (dispatch: any) => {
      dispatch(setDomicileAction({ field, value }));
    };

export default createReducer(initialState(), (builder) => {
  builder
    .addCase(setDomicileAction, (state, { payload: { field, value } }) => {
      setNestedField(state, field, value);
    })
});