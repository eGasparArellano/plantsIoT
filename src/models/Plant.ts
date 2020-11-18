export class Plant {
    id: number;
    name: string;
    description: string;
    quantity: number;
    irrigationPeriod: number;
    plantNumber: number;

    constructor() {
        this.id = -1;
        this.name = '';
        this.description = '';
        this.quantity = 1;
        this.irrigationPeriod = 1;
        this.plantNumber = -1;
    }
}
