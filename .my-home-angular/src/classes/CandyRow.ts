export class CandyRow{

    candies: Candy[];
    separator: string;

    constructor(candies: Candy[], separator?:string){
        this.candies = [];
        this.separator = (separator) ? separator : '/';
        this.setCandies(candies);
    }

    static getEmptyCandyRow(): CandyRow{
        return new CandyRow([]);
    }

    setNewCandyRow(candies: Candy[], separator?:string): void{
        this.separator = (separator) ? separator : this.separator;
        this.setCandies(candies);
    }

    setCandies(candies: Candy[]): void{
        this.candies = [];
        for (let index = 0; index < candies.length; index++) {
            this.candies.push(candies[index]);
            if(index < candies.length -1){
                this.candies.push(this.generateSeparator());
            }
        }
    }

    private generateSeparator(): Candy{
        return {name: this.separator, href: undefined, funct: undefined};
    }

}

export interface Candy{
    name:string;
    href?: string | undefined;
    funct?:Function | undefined;
}