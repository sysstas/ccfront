export class ClientSubmitedForm {
    constructor(
        public startHour: string,
        public workTime: string,
        public date: string,
        public city: string,
        public email: string,
        public name: string,
        public busy: any        
    ){}
}
