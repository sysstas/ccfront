export class Client {
    constructor(
        public time: string,
        public duration: string,
        public date: string,
        public cityId: string,
        public cityName: string,
        public userEmail: string,
        public userName: string
    ) {}
}

export class ClientBuilder {
  static  build(): Client {
    return  new Client('', '', '', '', '', '', '');
  }
}
