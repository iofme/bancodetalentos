import { User } from './user';
export class UserParams {
   role: string;
   pageNumber = 1;
   pageSize = 5;

     constructor(user: User |  null){
        this.role = user?.role === 'Programação' ? 'Design' :
        user?.role === 'Design' ? 'Games' : 'Programação';
     }
}