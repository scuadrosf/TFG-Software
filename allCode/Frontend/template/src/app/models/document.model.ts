import { Intervention } from "./intervention.model";

export interface Document {


    id: number;
    creationDate: Date;
    link: string;
    file: Blob;
    intervention: Intervention;


}
