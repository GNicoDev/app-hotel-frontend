import { Cliente } from "./cliente"

export class Room{
    id?: number
    guestCount?:number
    roomType!:string
    roomNumber!: number
    checkInDate?: Date
    checkOutDate?: Date
    pricePerNight!: number
    customer?: Cliente
}