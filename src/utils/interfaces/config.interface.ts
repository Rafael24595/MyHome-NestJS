export interface ConfigFile{
    root:string;
    tmp:string;
    collections: {
        path:{
            audio: string,
            image: string,
            video: string
        }
    }
}