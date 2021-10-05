export class evDataModel {
    constructor(
        public ladenWeight: number,
        public hillyDistance: number,  
        public highwayDistance: number,
        public cityDistance: number,   
        public initialSOC: number,
        public totalBatteryCapacity: number) {}
}