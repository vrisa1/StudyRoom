export class usuario {
    nombreUsuario : string = '';
    imagenPerfil : string = '';
    email :string = '';
}

export class evento {
    
    constructor(
        public summary: string,
        public description: string,
        public start: { dateTime: string, timeZone: string } | {date: string},
        public end: { dateTime: string, timeZone: string} | {date: string}
      ) {}
}