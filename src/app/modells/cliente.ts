import { Habitacion } from "./habitacion"

export class Cliente{
    id!: number
    passport?: number
    name?:string
    lastName?:string
    phone?:string
    rooms? : [Habitacion]
}