import { RouteObject } from "react-router-dom";
import HomeDash from "../pages/HomeDash";
import DomicileList from "../pages/DomicileList";

export const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomeDash />,
      },
      {
        path: "list",
        element: <DomicileList />,
      },
  
    ],
  },
];

export default routes;
