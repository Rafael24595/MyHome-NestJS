import { Schema } from "mongoose";

new Schema({
    name:String,
    surname1:String,
    surname2:String,
    range:Number,
    description:String,
    email:String,
    date:Number,
    //online:boolean;
    playListMusic: Object,  //TODO Crear interfaces
    playListVideo: Object,  //TODO Crear interfaces
    gallery: Object,        //TODO Crear interfaces
});