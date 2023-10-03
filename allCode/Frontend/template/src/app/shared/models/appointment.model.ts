import { Intervention } from "./intervention.model";
import { User } from "./user.model";

export interface Appointment{
    id:number;
    bookDate: Date;
    fromDate: Date;
    toDate: Date;
    description: string;
    interventions: Intervention[];
    user: User;
}