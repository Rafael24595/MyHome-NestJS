import { FileCollectionAbstract } from "src/classes/Collections/FileColectionAbstract";
import { logos_name } from "./Globals";

export const collection_owners = [
    new FileCollectionAbstract('Sistema', ``, true, false, false, true, `system`, logos_name.computer),
    new FileCollectionAbstract('Personales', ``, true, false, false, true, `user`, logos_name.computer)
  ]

export const system_collections_group = [
    new FileCollectionAbstract('Audios', ``, true, false, false, true, `system/audio`, logos_name.computer),
    new FileCollectionAbstract('Imágenes', ``, true, false, false, true, `system/image`, logos_name.computer),
    new FileCollectionAbstract('Videos', ``, true, false, false, true, `system/video`, logos_name.computer)
]; 