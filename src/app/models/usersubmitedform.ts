export class UserSubmitedForm {
    constructor(
        public time: string,
        public duration: string,
        public date: string,
        public cityID: string,
        public cityName: string,
        public userEmail: string,
        public userName: string               
    ){}
}
