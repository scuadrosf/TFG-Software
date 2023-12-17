import { Appointment } from "./appointment.model";
import { User } from "./user.model";

export interface Intervention {


    id: number;
    user: User;
    interventionDate: Date;
    type: string;
    document: Document;
    appointment: Appointment;


}
