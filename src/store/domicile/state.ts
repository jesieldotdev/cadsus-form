import { defaultExtraData, defaultHealthInfo, getDefaultDomicileItem } from "./utils";

export const initialDomicileState = (): DomicileState=>(
    {
      extraData: defaultExtraData,
      familyMembers:[],
      healthForm: defaultHealthInfo,
      items: [],
      formState: getDefaultDomicileItem(),
      individualModalTable: false,
      selectedItemIndex: -1,
      searchText: '',
      filter:{
        member: undefined,
        domicile:undefined
      }
      // filter: {
      //   domicile: {
      //     filter: {
      //       page: 0,
      //       limit: 50,
      //       filter: [],
      //       orderBy: [],
      //     },
      //     data: {
      //       meta: {
      //         total: 0,
      //       },
      //       data: [],
      //     },
      //   },
      // },
    }
  )