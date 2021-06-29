import { Schema } from "mongoose";

export const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    surname1:{
        type:String,
        required: true
    },
    surname2:{
        type:String,
        required: true
    },
    range:{
        type:Number,
        required: true
    },
    description:String,
    email:{
        type:String,
        required: true
    },
    date:{
        type: Number,
        default: new Date().getTime()
    },
    //online:boolean;
    playListMusic: {
        type: Object,
        default: []
    },
    playListVideo: {
        type: Object,
        default: []
    },
    gallery: {
        type: Object,
        default: []
    }
});