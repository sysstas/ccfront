export class ClientSubmitedForm {
    constructor(
        public time: string,
        public duration: string,
        public date: string,
        public cityID: string,
        public cityName: string,
        public clientEmail: string,
        public clientName: string               
    ){}
}
