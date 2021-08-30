import { service_config } from "src/utils/variables/Globals";
import { Gallery } from "./Collections/Gallery";

export class DragHorizontalPicture{

    static instance: DragHorizontalPicture | undefined;

    connection = service_config.connection;

    apiUri = `${this.connection.protocol}://${this.connection.host}:${this.connection.port}/api/file/preview/`;

    mouseUp:boolean = true;
    mouseDown:boolean = false;
    mouseMoveEvent: boolean = false;
    elementToDrag: HTMLElement;
    parentElement:HTMLElement;
    loadNextPage: Function;
    collection: Gallery;
    image: {position: number, show: boolean};
    positionOrigin: number | undefined;

    switchImage = {
        canSwitch: true,
        isSwitch: true,
        direction: 0
    }

    lastDistance: number = 0;
    velocity: number = 0;

    private constructor(elementToDrag:HTMLElement, parentElement:HTMLElement, loadNextPage:Function, collection: Gallery, image: {position: number, show: boolean}){
        this.elementToDrag = elementToDrag;
        this.parentElement = parentElement;
        this.loadNextPage = loadNextPage;
        this.collection = collection;
        this.image = image;
    }

    static listener(collection: Gallery, image: {position: number, show: boolean}, elementToDrag?:HTMLElement, parentElement?:HTMLElement, loadNextPage?:Function): DragHorizontalPicture | undefined{
        if(elementToDrag && loadNextPage && parentElement){
            if(!this.instance){
                this.instance = new DragHorizontalPicture(elementToDrag, parentElement, loadNextPage, collection, image);
            }
            else{
                this.instance.elementToDrag = elementToDrag;
                this.instance.parentElement = parentElement;
                this.instance.loadNextPage = loadNextPage;
            }
            this.instance.createMouseMoveEventListener();
        }
        if(this.instance){
            this.instance.collection = collection;
            this.instance.image = image;
        }
        return this.instance;
    }

    getImage(value: string): HTMLImageElement{
        return document.getElementById(value) as HTMLImageElement;
    }

    getImage01(): HTMLImageElement{
        return this.getImage('img-01'); 
    }

    getImage02(): HTMLImageElement{
        return this.getImage('img-02');
    }

    getImage03(): HTMLImageElement{
        return this.getImage('img-03');
    }

    getOffsetX(event: MouseEvent | TouchEvent): number{
        const rect = this.getElementBoundingClientRect(event);
        return (event instanceof MouseEvent) ? event.offsetX : event.changedTouches[0].clientX - rect.left;
    }

    getElementBoundingClientRect(event: MouseEvent | TouchEvent): DOMRect{
        const itemId = event.target as HTMLElement ;
        return itemId.getBoundingClientRect();
    }

    setImageSrc(image: HTMLImageElement, src: string):void{
        if(image){
            image.src = src;
        }
    }

    setCanSwitch(img: HTMLImageElement, mode: boolean): void{
        img.setAttribute('can-switch', `${mode}`);
    } 

    getCanSwitch(img: HTMLImageElement): boolean{
        const value = img.getAttribute('can-switch');
        return (value) ? JSON.parse(value) as boolean : false;
    }

    resetDistance(): void{
        this.moveParent(0);
    }

    resetImagesSrc(images: HTMLImageElement[]): void{
        for (let index = 0; index < images.length; index++) {
            this.setImageSrc(images[index], '');
            this.setCanSwitch(images[index], true);
        }
    }

    moveParentToLimit():void{
        if(this.switchElementExists()){
            let width = this.parentElement.getBoundingClientRect().width;
            this.moveParent(this.switchImage.direction * width);
        }
        else{
            this.switchImage.isSwitch = false;
            this.resetDistance();
        }
    }

    switchElementExists(): boolean{
        let image01 = this.getImage01();
        let image03 = this.getImage03();
        if(image01 && this.switchImage.direction > 0 && this.getCanSwitch(image01)){
            return true;
        }else if(image03 && this.switchImage.direction < 0 && this.getCanSwitch(image03)){
            return true;
        }
        return false;
    }

    moveParent(value: number): void{
        this.parentElement.style.marginLeft = `${value}px`;
    }

    enableSoftMove(enable: boolean): void{
        if(enable){
            this.parentElement.classList.add('soft-move');
        }else{
            this.parentElement.classList.remove('soft-move');
        }
    }

    onKeepMouseDown():void{
        setTimeout(() => {
            this.mouseDown = true;
        }, 1000);
    }

    onMouseUp(){
        this.mouseUp = true;
        this.mouseDown = false;
        window.removeEventListener('mousemove', this.onDrag);
        window.removeEventListener('touchmove', this.onDrag);
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('touchend', this.onMouseUp);
        this.positionOrigin = undefined;
        this.resetOrder();
    }

    createMouseMoveEventListener(){
        if(!this.mouseMoveEvent){
            window.addEventListener('mousemove', this.onDrag.bind(this));
            window.addEventListener('touchmove', this.onDrag.bind(this));
            window.addEventListener('mouseup', this.onMouseUp.bind(this));
            window.addEventListener('touchend', this.onMouseUp.bind(this));
        }
        this.mouseMoveEvent = true;
        this.mouseUp = false;
        setTimeout(()=>{
            if(!this.mouseUp){
                this.mouseDown = true;
            }
        }, 250);
    }

    onDrag(event: MouseEvent | TouchEvent){
        if(this.switchImage.canSwitch){
            const width = this.getElementBoundingClientRect(event).width;
            const cursor = this.getOffsetX(event);
            if(this.positionOrigin == undefined){
                this.positionOrigin = this.getOffsetX(event);
            }
            this.moveImage(cursor, width);
        }
    }

    moveImage(cursor: number, width: number): void{
        if(this.positionOrigin){
            const distance = this.positionOrigin - cursor;
            this.velocity = Math.abs(this.lastDistance - distance);

            if(Math.abs(distance) >= width / 4){
                this.switchImage.direction = (distance < 1) ? 1 : -1;
                this.switchImage.isSwitch = true;
            }
            else{
                this.switchImage.isSwitch = false;
            }

            this.lastDistance = distance;
            this.moveParent(-1 * distance);
        }
    }

    resetOrder(): void{
        this.switchImage.canSwitch = false;
        this.enableSoftMove(true);
        if(!this.switchImage.isSwitch){
            this.resetDistance();
        }
        else{
            this.moveParentToLimit();
        }
        setTimeout(() => {
            this.enableSoftMove(false);
            if(this.switchImage.isSwitch){
                this.switchImage.isSwitch = false;
                this.setNewImagesOrder();
            }else{
                this.switchImage.canSwitch = true;
            }
        }, 500);
    }
 
    setNewImagesOrder(): void{

        let image01 = this.getImage01();
        let image02 = this.getImage02();
        let image03 = this.getImage03();

        if(image01 && image02 && image03){
            this.resetImagesSrc([image01,image02,image03]); 
            switch (this.switchImage.direction) {
                case 1:
                    const image01Exists = (this.collection.list[this.image.position - 2]) ? `${this.apiUri}${this.collection.list[this.image.position - 2].path}` : '';
                    this.setImageSrc(image01, image01Exists);
                    this.setImageSrc(image02, `${this.apiUri}${this.collection.list[this.image.position - 1].path}`);
                    this.setImageSrc(image03, `${this.apiUri}${this.collection.list[this.image.position].path}`);
                    this.image.position = this.image.position - 1;
                    this.setCanSwitch(image01, (image01Exists != ''));
                break;
                case -1:
                    const image03Exists = (this.collection.list[this.image.position + 2] != undefined) ? `${this.apiUri}${this.collection.list[this.image.position + 2].path}` : '';
                    this.setImageSrc(image01, `${this.apiUri}${this.collection.list[this.image.position].path}`);
                    this.setImageSrc(image02, `${this.apiUri}${this.collection.list[this.image.position + 1].path}`);
                    this.setImageSrc(image03, image03Exists);
                    this.image.position = this.image.position + 1;
                    this.setCanSwitch(image03, (image03Exists != ''));
                break;
            
                default: break;
            }
        }
        image02.style.transform = `rotate(0deg)`; //TODO Refactorizar
        image02.style.maxWidth = '100%';
        image02.style.maxHeight = '100%';
        this.switchImage.canSwitch = true;
        this.checkCollectionLength();
        this.resetDistance();
    }

    checkCollectionLength(): void{
        const total = this.collection.total;
        const length = this.collection.list.length;
        const position = this.image.position;
        const marginToSearch = length - 3;
        if(total && length < total && position >= marginToSearch){
            this.loadNextPage();
        }
    }

}