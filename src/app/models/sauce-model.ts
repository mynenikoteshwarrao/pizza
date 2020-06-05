import { Base } from './base-model';

export class Sauce extends Base<Sauce>{
    public id: number;
    public name: string;
    public price: number;
}