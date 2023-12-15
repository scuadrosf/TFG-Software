import { Intervention } from "./intervention.model";
import { User } from "./user.model";

export interface Util {

    id: number;
    numPatientsYesterday:number;
    appointmentsCompletedYesterday:number;
    numPatientsTotal:number;

}
