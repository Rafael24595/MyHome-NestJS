import { join } from "path";

export const PathVariables: {private_assets_root: string, tmp_thumbnails:string} = {
    private_assets_root: join(__dirname, '../../private_assets'),
    tmp_thumbnails: join(__dirname, '../../.tmp')
}

export const LifeTime: {thumbnail: number} = {
    thumbnail: 43200000
}