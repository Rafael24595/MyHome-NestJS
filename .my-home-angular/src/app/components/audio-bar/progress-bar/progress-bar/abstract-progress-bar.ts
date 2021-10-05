
export class AbstractProgressBarComponent {

    barColor = '#00000';
    barBackColor = '#00000';
    barMeatBallColor = '#00000';
    size: number = 0;
    progress: number = 0;
    media: HTMLAudioElement;
    mouseDown = false;

    timeToolTip = {
        position: 0,
        display: '',
        value: ''
    }

    public constructor(media: HTMLAudioElement) {
        this.media = media;
        this.setInitialSize();
    }

    public setInitialSize(): void{
        setTimeout(()=>{
            this.resizeBar(this.media);
        }, 100);
    }

    public screenResize(): void{
        window.onresize = ()=>{
        this.resizeBar(this.media);
        }
    }

    public resizeBar(media: HTMLAudioElement){}

    public toClick(event:MouseEvent | TouchEvent){
        const itemId = event.target as HTMLElement ;
        const rect = itemId.getBoundingClientRect();
        const offsetX = (event instanceof MouseEvent) ? event.offsetX : event.changedTouches[0].clientX - rect.left;

        this.calculatePosition(offsetX);
        this.mouseDownBar();
        
        event.preventDefault();
    }

    mouseDrag(event:MouseEvent | TouchEvent){
        if(this.mouseDown){
            this.barDrag(event);
        }
    }

    barDrag(event:MouseEvent | TouchEvent){}
  
    mouseDownBar(){}
  
    mouseUp(){}

    calculatePosition(coorY:number){}

}