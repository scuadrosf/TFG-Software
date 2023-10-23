import { Intervention } from "./intervention.model";
import { User } from "./user.model";

export interface Appointment {

    id: number;
    bookDate: string;
    fromDate: string;
    toDate: string;
    description: string;
    interventions: Intervention[];
    user: User;
    additionalNote: string;
    completed: boolean;

}
