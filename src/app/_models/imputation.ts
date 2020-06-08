import { User } from './user';


export enum Status {
    Initial = 'Initial',
    Sent = 'Sent',
    Valid = 'Valid',   
}

export class Imputation {
   
    id: number;
    project: string;
    hours: number;
    date:Date;
    user: User;
    status:Status;
    
  
}
