
const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]

class Clase{
    dia?: number;
    horaInicio?: number;
    horaFin?: number;
    salon?: string;

    apply = (data:any) => {
        this.dia = data.dia;
        this.horaInicio = data.horaInicio;
        this.horaFin = data.horaFin;
        this.salon = data.salon;
    }

    getHora = (idx: number) => {
        return `${(idx+6).toString().padStart(2,"0")}:00`
    }


    toString = (): string => {
        return `${dias[this.dia!]} (${this.getHora(this.horaInicio!)} - ${this.getHora(this.horaFin!)}) - ${this.salon} `
    }
}

export default Clase;