const emptyTimer: ModalTimerInterface = {enable: false, show: false, timeMs: 0};
const emptyQuestion: ModalQuestionInterface = {enable: false, affirmative: {text:'', funct: undefined}, negative: {text:'', funct: undefined}};

export class Modal{
    
    title: string;
    actions: boolean;
    elements: ModalElementsInterface[];
    timer:ModalTimerInterface;
    question: ModalQuestionInterface;

    constructor(title: string, elements: ModalElementsInterface[], timer:ModalTimerInterface, question: ModalQuestionInterface, actions?: boolean){
        this.title = title;
        this.elements = elements;
        this.timer = timer;
        this.question = question;
        this.actions = (actions != undefined) ? actions : true;
    }

    static getEmptyModal(): Modal{
        return new Modal('', [], emptyTimer, emptyQuestion);
    }

    static setBasicModal(title: string, elements: ModalElementsInterface[], actions?: boolean): Modal{
        return new Modal(title, elements, emptyTimer, emptyQuestion, actions);
    }

}

export interface ModalElementsInterface{
    message:{
        title: string,
        body: string
    },
    click:boolean,
    funct:Function | undefined,
    params: any
}

export interface ModalTimerInterface{
    enable: boolean,
    show: boolean,
    timeMs: number
}

export interface ModalQuestionInterface{
    enable: boolean;
    affirmative: {
        text: string,
        funct: Function | undefined
    };
    negative: {
        text: string,
        funct: Function | undefined
    };
}