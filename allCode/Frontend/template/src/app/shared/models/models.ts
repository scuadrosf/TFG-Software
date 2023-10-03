import { Appointment } from "src/app/models/appointment.model";
import { Intervention } from "src/app/models/intervention.model";

export interface pageSelection {
  skip: number;
  limit: number;
}
export interface apiResultFormat {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<any>;
  totalData: number;
}








export interface SubMenu {
  menuValue: string;
  route: string;
  base: string;
 
}
export interface MenuItem {
  menuValue: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  base: string;
  route?: string;
  img?: string;
  icon?: string;
  faIcon?: boolean;
  subMenus: SubMenu[];
  // role
  
}

export interface SideBarData {
  tittle: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: MenuItem[];
  // role
} 
  

