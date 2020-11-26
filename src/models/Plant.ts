export class Plant {
    id: number;
    name: string;
    description: string;
    humidity: number;
    plantNumber: number;

    constructor() {
        this.id = -1;
        this.name = '';
        this.description = '';
        this.humidity = 0;
        this.plantNumber = -1;
    }
}
