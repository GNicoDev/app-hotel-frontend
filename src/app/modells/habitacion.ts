import { Cliente } from "./cliente"

export class Habitacion{
    id!: number
    cantHuespedes?:number
    tipoHabitacion!:string
    nroHabitacion!: number
    fechaDeIngreso?: Date
    fechaDeEgreso?: Date
    precio!: number
    cliente?: Cliente
}