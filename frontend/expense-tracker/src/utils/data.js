import {
  LuLayoutDashboard,
  LuTrendingUp,
  LuLogOut,
} from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: FaDollarSign,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuTrendingUp,
    path: "/expense",
  },
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];
