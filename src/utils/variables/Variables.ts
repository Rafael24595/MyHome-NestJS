import { join } from "path";

export const PathVariables: {private_assets_root: string, tmp_thumbnails:string, media_sources:string, collections_audio: string, collections_image: string, collections_video: string} = {
    private_assets_root: '',
    tmp_thumbnails: '',
    media_sources: '',
    collections_audio: '',
    collections_image: '',
    collections_video: ''
}

export const SystemFiles: {error: string, broken_image: string} = {
    error: 'error.png',
    broken_image: 'broken-image.png'
}

export const LifeTime: {thumbnail: number} = {
    thumbnail: 43200000
}