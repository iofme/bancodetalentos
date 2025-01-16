export interface Member {
    id: number;
    userName: string;
    passwordHash: string;
    passwordSalt: string;
    about: string;
    role: string;
    age: Date;
    photoUrl: string;
    videoUrl: string;
    admin: boolean;
    logicaDeProgramacao: string;
  }
  