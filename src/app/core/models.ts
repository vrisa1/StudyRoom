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
        public start: { dateTime: string, timeZone: string } | {date: string},
        public end: { dateTime: string, timeZone: string} | {date: string}
      ) {}
}

export class tarea {
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public state: string
    ) {}
  }