
export class AppUtils{

    cleanUrl(controller: string, url: string): string{
        let path: string = url.replace(`api/${controller}/`, '');
        path = path.replace(/\?.*/g, '');
        console.log(path); 
        return path;
    }

}