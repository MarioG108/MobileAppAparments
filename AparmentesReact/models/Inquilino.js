
export default class Inquilino {
    inquilinoId: string;
    nombre: string;
    cedula : string;
    telefono: string;
    alquile: string;
    deposito : string;
    aptnum: string;
    contratonum: string;
    fecha :any ;

    constructor(inquilinoId: string, data: any) {
        if(!data)
             return;
        this.inquilinoId = inquilinoId;
        this.nombre = data.nombre;
        this.cedula = data.cedula;
        this.telefono = data.telefono;
        this.alquile = data.alquile;
        this.deposito = data.deposito;
        this.aptnum = data.aptnum;
        this.contratonum = data.contratonum;
        this.fecha = data.fecha;
        
    }

    clone() {
        return new Inquilino(this.inquilinoId,{  nombre: this.nombre, cedula: this.cedula, telefono: this.telefono, alquile: this.alquile, deposito: this.deposito, aptnum: this.aptnum,contratonum: this.contratonum,fecha: this.fecha });
    }   
               

    getObjectInfo1(){
        return{
            inquilinoId : this.inquilinoId,
            nombre : this.nombre,
            cedula : this.cedula,
            telefono : this.telefono,
            alquile : this.alquile,
            deposito : this.deposito, 
            aptnum : this.aptnum,
            contratonum : this.contratonum,
            fecha : this.fecha  
        }
    }
}
