export class MiscTools{

    static getElementById(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    static cleanPxValue(value: string): number{
        return parseInt(value.replace(/px/g, ''));
    }

    static getLocalStorage(key: string): any{
        const value = localStorage.getItem(key);
        return (value) ? JSON.parse(value) : undefined;       
    }

    static setLocalStorage(key: string, value:any): void{
        localStorage.setItem(key, JSON.stringify(value));
    }
}