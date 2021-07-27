export class MiscTools{

    static getElementById(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    static cleanPxValue(value: string): number{
        return parseInt(value.replace(/px/g, ''));
    }

}