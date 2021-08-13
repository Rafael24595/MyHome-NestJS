export class ErrorTools{

    static reloadBrokenImage(event: Event):void{
        const img = event.currentTarget as HTMLImageElement;
        const count = (img.getAttribute('reload') != null) ? parseInt(img.getAttribute('reload') as string) + 1 : 1;console.log(count)
        if(count < 5){
            setTimeout(() => {
                img.setAttribute('reload', JSON.stringify(count));
                const src = img.src;
                if(img.tagName == 'IMG'){
                    img.src = src;
                }
            }, 1000);
        }
        else{
            img.onerror = null;
            img.src = '../../assets/media/images/icons/error.png';
        }

    }

}