import { Intervention } from "./intervention.model";

export interface Document {


    id: number;
    fileName: string;
    creationDate: Date;
    link: string;
    file: number[];
    intervention: Intervention;


}
