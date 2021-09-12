export class ModalForm{

    title: string;
    funct: Function;
    inputs: ModalInput[];
    closeEnd: boolean;
    center: boolean;
    buttonTittle: string;

    constructor(title: string,funct: Function,inputs: ModalInput[], buttonTittle:string, closeEnd?: boolean, center?:boolean){
        this.title = title;
        this.funct = funct;
        this.inputs = inputs;
        this.buttonTittle = buttonTittle;
        this.closeEnd = (closeEnd) ? closeEnd : true;
        this.center = (center) ? center : false;
    }

    static setBasicModalCenter(title: string,funct: Function,inputs: ModalInput[], buttonTittle:string): ModalForm{
        return new ModalForm(title, funct, inputs, buttonTittle, true, true);
    }

    static getEmptyModal(): ModalForm{
        return new ModalForm('', ()=>{} , [], '');
    }

}

export interface ModalInput{
    title:string;
    name:string;
    type: string;
    value: string;
    required: boolean;
    validationRegex: string;
    change:Function | undefined;
}