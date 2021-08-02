import { readFileSync } from "fs";
import { join } from "path";
import { ConfigFile } from "./interfaces/config.interface";
import { PathVariables } from "./variables/Variables";

export class ConfigTools{

    public static OnInit(): void{
        const filePath = join(__dirname, '..', '..', 'my-home-config.json');
        try {
            const file: ConfigFile = JSON.parse(readFileSync(filePath).toString());
            if(file){
                PathVariables.private_assets_root = join(__dirname, '..', '..', file.root);
                PathVariables.tmp_thumbnails = join(__dirname, '..', '..', file.tmp);
                PathVariables.collections_audio = join(PathVariables.private_assets_root, file.collections.path.audio);
                PathVariables.collections_image = join(PathVariables.private_assets_root, file.collections.path.image);
                PathVariables.collections_video = join(PathVariables.private_assets_root, file.collections.path.video);
            }

        } catch (error) {
            console.log(error);
            ConfigTools.setDefaultConfig();
        }
    }

    private static setDefaultConfig(){
        PathVariables.private_assets_root = join(__dirname, '..', '..', 'private_assets');
        PathVariables.tmp_thumbnails = join(__dirname, '..', '..', '.tmp');
        PathVariables.collections_audio = join(PathVariables.private_assets_root, 'media', 'audio');
        PathVariables.collections_image = join(PathVariables.private_assets_root, 'media', 'image');
        PathVariables.collections_video = join(PathVariables.private_assets_root, 'media', 'video');
    }

}