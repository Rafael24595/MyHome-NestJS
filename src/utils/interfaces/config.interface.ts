export interface ConfigFile{
    root:string;
    tmp:string;
    media: string;
    collections: {
        path:{
            audio: string,
            image: string,
            video: string
        }
    }
}