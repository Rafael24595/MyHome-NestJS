import { Path } from "src/classes/Path";

export class SortTools{
    static Path = {
        groupByDirectory(pathList: Path[], dir: boolean): Path[]{

            let back: Path[] = [];
            let directories: Path[] = [];
            let files: Path[] = [];

            pathList.forEach(path =>{
                if(path.back){
                    back.push(path);
                }
                else{
                    if(path.directory){
                        directories.push(path);
                    }
                    else{
                        files.push(path)
                    }
                }
            });

            if(dir){
                return back.concat(directories.concat(files));
            }
            else{
                return back.concat(files.concat(directories));
            }

        },
        groupByExtension(pathList: Path[]): Path[]{
            let extensions: any = {};
            let final: Path[] = [];

            for (let index = 0; index < pathList.length; index++) {
                if(pathList[index].back){
                    final.push(pathList[index]);
                }
                else{
                    if(!extensions[pathList[index].extension])
                        extensions[pathList[index].extension] = [];
                    extensions[pathList[index].extension].push(pathList[index]);
                }
            }

            for (const key in extensions) {
                final = final.concat(extensions[key]);
            }
            
            return final;
        },
        groupByType(pathList: Path[]): Path[]{
            let type: any = {};
            let final: Path[] = [];

            for (let index = 0; index < pathList.length; index++) {
                if(pathList[index].back){
                    final.push(pathList[index]);
                }
                else{
                    if(!type[pathList[index].type])
                        type[pathList[index].type] = [];
                    type[pathList[index].type].push(pathList[index]);
                }
            }

            for (const key in type) {
                final = final.concat(type[key]);
            }
            
            return final;
        },
        orderByName(pathList: Path[], ascendent?: boolean): Path[]{
            const mode = (ascendent) ? 1 : -1;
            pathList = pathList.sort((elementA, elementB) => {
                if(elementA.name.toLowerCase() < elementB.name.toLowerCase()) { return -1 * mode; }
                if(elementA.name.toLowerCase() > elementB.name.toLowerCase()) { return 1 * mode; }
                return 0;
            });
            return pathList;
        },
        orderBySize(pathList: Path[], ascendent?: boolean): Path[]{
            ascendent = (ascendent == undefined) ? true : ascendent;
            pathList = pathList.sort((elementA, elementB) => {
                if(ascendent)
                    return elementB.size - elementA.size;
                return elementA.size - elementB.size;
            });
            return pathList;
        },
        orderByBirth(pathList: Path[], ascendent?: boolean): Path[]{
            ascendent = (ascendent == undefined) ? true : ascendent;
            pathList = pathList.sort((elementA, elementB) => {
                if(ascendent)
                    return elementB.birthtime - elementA.birthtime;
                return elementA.birthtime - elementB.birthtime;
            });
            return pathList;
        }
    }
}