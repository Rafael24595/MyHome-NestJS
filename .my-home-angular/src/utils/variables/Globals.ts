import { User } from "src/classes/User";

export const service_config = {
    connection: {
        protocol: 'http',
        //host: 'localhost',
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

export const group_types = {
    directories: 'directories',
    extension: 'extension',
    files: 'files',
    type: 'type'
}

export const order_types = {
    name: 'name',
    size: 'size',
    birth: 'birth'
}

export const logos_name = {
    computer: 'images/icons/computer.png',
    smartphone: 'images/icons/smartphone.png',
    audio_collection: 'images/icons/audio-collection.png',
    video_collection: 'images/icons/video-collection.png',
    image_collection: 'images/icons/image-collection.png',
    user_fedora: 'images/icons/user-fedora.png',
    heart: 'images/icons/heart.png',
    directory:{
        folder:'images/icons/folder.png',
        back:'images/icons/folder-back.png',
    },
    files:{
        audio: 'images/icons/audio-file.png',
        other: 'images/icons/unknown-file.png'
    }
}

export let user_config: {user: User | undefined, lastElementIdMedia: {path: string, pathParent: string},lastElementIdCollection: {path: string, pathParent: string}} = {
    user: undefined,
    lastElementIdMedia: {
        path: '',
        pathParent: ''
    },
    lastElementIdCollection: {
        path: '',
        pathParent: ''
    }
};