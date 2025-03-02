import { RouteObject } from "react-router-dom";
import HomeDash from "../pages/HomeDash";
import DomicileList from "../pages/DomicileList";
import DomicileDetail from "../pages/DomicileDetail";
import MemberDetail from "../pages/MemberDetail";
import Form from "../pages/Form";
import SettingsPage from "../pages/SettingsPage";

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
      {
        path: "/domicile/:domicileId",
        element: <DomicileDetail  />,
      },
      {
        path: "/member/:sus",
        element: <MemberDetail   />,
      },
      {
        path: "/new",
        element: <Form   />,
      },
      {
        path: "/settings",
        element: <SettingsPage   />,
      },
  
    ],
  },
];

export default routes;
