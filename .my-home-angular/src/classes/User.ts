import { Gallery } from "./Collections/Gallery";
import { PlayListMusic } from "./Collections/PlayListMusic";
import { PlayListVideo } from "./Collections/PlayListVideo";

export class User{

    public static activeUser: any;

    name: string;
    surname1: string;
    surname2: string;
    email: string;
    description:string;
    playListMusic: PlayListMusic[];
    playListVideo: PlayListVideo[];
    gallery: Gallery[];
    range: number;
    date: number;
    online: boolean;

    constructor(name: string, surname1: string, surname2: string, range: number, date:number, description:string, email: string, playListMusic?: PlayListMusic[], playListVideo?: PlayListVideo[], gallery?: Gallery[], online?: boolean){
        
        this.name = name;
        this.surname1 = surname1;
        this.surname2 = surname2;
        this.range = range;
        this.description = (description) ? description : "";
        this.email = email;
        this.date = date;
        this.online = (online) ? online : false;
        this.playListMusic = [];
        this.playListVideo = [];
        this.gallery = [];

        this.setPlayLists(playListMusic, playListVideo, gallery);

    }

    setPlayLists(playListMusic?: PlayListMusic[], playListVideo?: PlayListVideo[], gallery?: Gallery[]){

        if(playListMusic){
            playListMusic.forEach(theme=>{
            this.playListMusic.push(new PlayListMusic(theme.name,theme.owner,theme.userView,theme.userManage,theme.privateState,theme.list,theme.systemList, theme.path));
            });
        }

        if(playListVideo){
            playListVideo.forEach(video=>{
            this.playListVideo.push(new PlayListVideo(video.name,video.owner,video.userView,video.userManage,video.privateState,video.list,video.systemList,video.path,video.totalElements,video.videoElements));
            });
        }

        if(gallery){
            gallery.forEach(image=>{
            this.gallery.push(new Gallery(image.name,image.owner,image.userView,image.userManage,image.privateState,image.list,image.systemList, image.path, image.totalElements, image.imageElements));
            });
        }

    }

}