export class usuario {
    constructor(
        public name : string,
        public picture : string,
        public email :string,
        public token : string
    ){}
}

export class evento {
    
    constructor(
        public summary: string,
        public description: string,
        public start: { dateTime: string, timeZone: string },
        public end: { dateTime: string, timeZone: string }
      ) {}
}