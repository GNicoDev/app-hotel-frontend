import { Habitacion } from "./habitacion"

export class Cliente{
    id!: number
    dni?: number
    nombre?:string
    apellido?:string
    telefono?:string
    habitaciones? : [Habitacion]
}