import { Path } from "src/classes/Path";
import { User } from "src/classes/User";

export const service_config = {
    connection: {
        protocol: 'http',
        host: 'localhost',
        port: '3000'
    }
}

export const media_types = {
    audio: 'audio',
    video: 'video',
    image: 'image',
    other: 'other'
}

export const logos_name = {
    directory:{
        folder:'images/icons/folder.png',
        back:'images/icons/folder-back.png',
    },
    files:{
        audio: 'images/icons/audio-file.png',
        other: 'images/icons/unknown-file.png'
    }
}

export let user_config: {user: User | undefined} = {
    user: undefined
};