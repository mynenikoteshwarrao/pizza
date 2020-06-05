import { Base } from './base-model';

export class Crust extends Base<Crust> {
    public id: number;
    public name: string;
    public price: number;
}