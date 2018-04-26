
export class User {
    //usuarios: (Nombre, Email, Puesto, Teléfono, Edad y Estado -activo/inactivo-).
    constructor(public name: string = ''
      , public email: string = ''
      , public position: string = ''
      , public phone: string = ''
      , public age: string = ''
      , public isActive: boolean = false
      , public id: string = null

    ) { }
  
  }