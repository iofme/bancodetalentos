import { Member } from './member';
export class Params{
    logicaDeProgramacao: string;

    constructor(member: Member | null){
        this.logicaDeProgramacao = member?.logicaDeProgramacao === 'nivel1'? 'nivel2' : 'nivel1'
    }
}