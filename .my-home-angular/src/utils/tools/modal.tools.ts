import { FileManagerComponent } from "src/app/components/body/file-manager/file-manager.component";
import { ModalBaseComponent } from "src/app/components/modal-components/modal-base.component";
import { Modal } from "src/classes/Modal";
import { Path } from "src/classes/Path";
import { MiscTools } from "./misc.tools";

export class ModalTools{

    static generateDescription(path: Path): void{
        let options = Modal.setBasicModal(
            'Detalles',
            [
              {message: {title: 'Ruta', body:`${path.abpath}`}, click: false, funct: undefined, params: undefined}
            ],
            false
        );

        if(MiscTools.isFile(path.abpath)){
        options.elements.push({message: {title: 'Nombre', body:`${path.name}.${path.extension}`}, click: false, funct: undefined, params: undefined});
        options.elements.push({message: {title: 'Tipo de fichero', body:`${path.type}`}, click: false, funct: undefined, params: undefined});
        }
        else{
        options.elements.push({message: {title: 'Nombre', body:`${path.name}`}, click: false, funct: undefined, params: undefined});
        options.elements.push({message: {title: 'Directorios', body:`${path.content.directory}`}, click: false, funct: undefined, params: undefined});
        options.elements.push({message: {title: 'Ficheros', body:`${path.content.file}`}, click: false, funct: undefined, params: undefined});
        }

        options.elements.push({message: {title: 'Tamaño', body:`${MiscTools.formatBytes(path.size)}`}, click: false, funct: undefined, params: undefined});
        options.elements.push({message: {title: 'Fecha de creación', body:` ${MiscTools.formatDate(path.birthtime)}`}, click: false, funct: undefined, params: undefined});

        ModalBaseComponent.openModal(options);

    }

    static generateActions(instance: FileManagerComponent, path: Path): void{
        const options = Modal.setBasicModal(
            'Opciones',
            [
              {message: {title: '', body: 'Propiedades'}, click: false, funct: instance.showProperties, params: path},
              {message: {title: '', body: 'Renombrar'}, click: false, funct: undefined, params: undefined},
              {message: {title: '', body: 'Copiar'}, click: false, funct: undefined, params: undefined},
              {message: {title: '', body: 'Cortar'}, click: false, funct: undefined, params: undefined},
              {message: {title: '', body: 'Borrar'}, click: false, funct: undefined, params: undefined},
            ]
        );

        ModalBaseComponent.openModal(options);
    }

}