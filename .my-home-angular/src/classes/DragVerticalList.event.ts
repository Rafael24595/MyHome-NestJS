
export class DragVerticalList{

    static instance: DragVerticalList | undefined;

    static mouseUp:boolean = true;
    static mouseDown:boolean = false;
    static mouseMoveEvent: boolean = false;
    static elementToDrag: HTMLElement;
    static elementsList: HTMLElement[];
    static sendFunction: Function;
    static scrollTimeOut: any;
    static elementWidth: number = 100;
    static elementHeight: number = 50;
    static elementScrollHeight: number = 50;
    static positionGuide: HTMLElement | undefined;

    constructor(elementToDrag:HTMLElement, elementsList:HTMLElement[], sendFunction:Function){
        DragVerticalList.elementToDrag = elementToDrag;
        DragVerticalList.elementsList = elementsList;
        DragVerticalList.sendFunction = sendFunction;
    }

    static DragVerticalListListener(elementToDrag?:HTMLElement, elementsList?:HTMLElement[], sendFunction?:Function){
        if(elementToDrag && elementsList && sendFunction){
            if(!this.instance){
                this.instance = new DragVerticalList(elementToDrag, elementsList, sendFunction);
            }
            else{
                this.elementToDrag = elementToDrag;
                this.elementsList = elementsList;
                this.sendFunction = sendFunction;
            }
            DragVerticalList.createMouseMoveEventListener();
        }
        return this.instance;
    }
    
    static mouseUpCancelDrag(){
        if(DragVerticalList.positionGuide && DragVerticalList.elementToDrag.parentElement){
            DragVerticalList.elementToDrag.parentElement.insertBefore(DragVerticalList.elementToDrag, DragVerticalList.positionGuide);
            DragVerticalList.elementToDrag.classList.remove('in-drag');
            DragVerticalList.elementToDrag.style.position = 'relative';
            DragVerticalList.elementToDrag.style.zIndex = '1';
            DragVerticalList.elementToDrag.style.width = 'auto';
            DragVerticalList.elementToDrag.style.top = '0';
            DragVerticalList.removePositionGuide();

            DragVerticalList.dropAnimation();
            DragVerticalList.reorderList();
        }
        DragVerticalList.mouseUp = true;
        DragVerticalList.mouseDown = false;
        DragVerticalList.positionGuide = undefined;
        window.removeEventListener('mousemove', this.elementDrag);
        window.removeEventListener('mouseup', this.mouseUpCancelDrag);
    }

    static reorderList(){
        let parent = DragVerticalList.elementToDrag.parentElement;
        let newList:{listId: string, themeId: string, position: number}[] | undefined = [];
        if(parent){
            let elements = parent.childNodes;
            let cont = 0;
            for (let index = 0; index < elements.length; index++) {
                let element = elements[index] as HTMLElement;
                if(element.id){
                    let idSplitted = element.id.split('-');
                    if(idSplitted[3] && idSplitted[4] && idSplitted[5]){
                        let listId = idSplitted[3];
                        let themeId = `${idSplitted[4]}-${idSplitted[5]}`;
                        newList.push({listId, themeId, position: cont});
                        cont ++;
                    }
                }
            }
            DragVerticalList.sendFunction(newList);
        }
    }

    static dropAnimation(){
        DragVerticalList.elementToDrag.classList.add('drop-fall');
        setTimeout(()=>{DragVerticalList.elementToDrag.classList.remove('drop-fall');},75);
    }

    static createMouseMoveEventListener(){
        if(DragVerticalList.elementToDrag.parentElement){
            if(!DragVerticalList.mouseMoveEvent){
                window.addEventListener('mousemove', this.elementDrag);
                window.addEventListener('mouseup', this.mouseUpCancelDrag);
            }
            DragVerticalList.elementWidth = this.elementToDrag.getBoundingClientRect().width;
            DragVerticalList.elementHeight = this.elementToDrag.getBoundingClientRect().height;
            DragVerticalList.elementScrollHeight = DragVerticalList.elementToDrag.parentElement.scrollHeight;
            DragVerticalList.mouseMoveEvent = true;
            DragVerticalList.mouseUp = false;
            setTimeout(()=>{
                if(!DragVerticalList.mouseUp){
                    DragVerticalList.mouseDown = true;
                }
            }, 500);
        }
    }

    static elementDrag(event: MouseEvent){
        if(DragVerticalList.mouseDown){
            let parentElement = DragVerticalList.elementToDrag.parentElement as HTMLElement;
            let position = event.clientY - parentElement.getBoundingClientRect().top + parentElement.scrollTop;
            let positionInContainer = DragVerticalList.getElementPositionPercentage(event, parentElement);

            //var minHeight = elementEvent.offsetHeight / 3.25;
			//var maxHeight = parentContainer.scrollHeight - elementEvent.offsetHeight / 4.25;

            event.stopPropagation();
		    event.preventDefault();

            DragVerticalList.elementToDrag.style.position = 'absolute';
            DragVerticalList.elementToDrag.style.zIndex = '5';
            DragVerticalList.elementToDrag.style.width = `${DragVerticalList.elementWidth}px`;
            DragVerticalList.elementToDrag.classList.add('in-drag');
            if(positionInContainer > 0 && positionInContainer < 0.1){
                (DragVerticalList.scrollTimeOut) ? clearTimeout(DragVerticalList.scrollTimeOut) : "";
                DragVerticalList.scrollTimeOut = setTimeout(function(){DragVerticalList.elementDrag(event)}, 1);
                parentElement.scrollBy(0, -3);
            }
            else if (positionInContainer > 0.9 && positionInContainer < 1) {
                (DragVerticalList.scrollTimeOut) ? clearTimeout(DragVerticalList.scrollTimeOut) : "";
                DragVerticalList.scrollTimeOut = setTimeout(function(){DragVerticalList.elementDrag(event)}, 1);
                parentElement.scrollBy(0, 2);
            }
            else{
                (DragVerticalList.scrollTimeOut) ? clearTimeout(DragVerticalList.scrollTimeOut) : "";
            }

            if(positionInContainer > 0.0 && positionInContainer < 1){
                if(position < DragVerticalList.elementScrollHeight - DragVerticalList.elementHeight * 1.25){
                    position = position - DragVerticalList.elementHeight * 0.75
                    DragVerticalList.elementToDrag.style.top = `${position}px`;
                }
                
            }

            var i = 0;

            DragVerticalList.removePositionGuide();

            DragVerticalList.positionGuide = document.createElement('div');
            DragVerticalList.positionGuide.className = 'position-guide';

            let downElement;
            let diference: number | undefined;

            while(i<DragVerticalList.elementsList.length){
                let element = DragVerticalList.elementsList[i]
                if(element.id != DragVerticalList.elementToDrag.id){
                    let diferenceBetween = element.getBoundingClientRect().top - DragVerticalList.elementToDrag.getBoundingClientRect().top;
                    if(diferenceBetween >= 0 && (diference == undefined || diferenceBetween < diference)){
                        downElement = element
                        diference = diferenceBetween;
                    }
                }
                i++;
            }

            if( DragVerticalList.elementToDrag.parentElement){
                //DragVerticalList.elementToDrag.parentElement.insertBefore(DragVerticalList.positionGuide, downElement);
            }
            
        }
    }

    static removePositionGuide(){

        let positionGuideElement = document.getElementsByClassName('position-guide');

        for (let index = 0; index < positionGuideElement.length; index++) {
            positionGuideElement[index].remove();
            
        }
    }

    static getElementPositionPercentage(event: MouseEvent, parent: HTMLElement){

		return (event.clientY - parent.getBoundingClientRect().top) / parent.offsetHeight;

	}

}