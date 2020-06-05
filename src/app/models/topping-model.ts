import { Base } from './base-model';

export class Topping extends Base<Topping>{
    public id: number;
    public name: string;
    public price: number;
    public isNonVeg: boolean;
}