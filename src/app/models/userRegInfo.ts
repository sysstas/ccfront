export class UserRegInfo {
    constructor(
        public userName: string,
        public userEmail: string,
        public password: string, 
        public passwordConfirm: string,
        public isRegistered: number,
    ){}
}
