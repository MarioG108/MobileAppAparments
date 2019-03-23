export default class Pago {
    pagoId: string;
    aptNum: string;
    fechaPago : string;

    constructor(pagoId: string, data: any) {
        if(!data)
             return;
        this.pagoId = pagoId;
        this.aptNum = data.aptNum;
        this.fechaPago = data.fechaPago;
    }

    clone() {
        return new Pago(this.pagoId,{  aptNum: this.aptNum, fechaPago: this.fechaPago });
    }   
               

    getObjectInfo(){
        return{
            pagoId : this.pagoId,
            aptNum : this.aptNum,
            fechaPago : this.fechaPago  
        }
    }
}
