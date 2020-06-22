import { User } from './user';
import { Project } from './project';


export enum Status {
    Initial = 'Initial',
    Sent = 'Sent',
    Valid = 'Valid',   
}
export enum Hours {
    

}
 
export class Imputation {
   
    id: number;
    project: Project;
    hours: number;
    date:Date;
    user: User;
    status:Status;
    
  
}
