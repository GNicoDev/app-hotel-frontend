import { Room } from "./room"

export class Customer{
    id!: number
    passport?: number
    name?:string
    lastName?:string
    phone?:string
    rooms? : [Room]
}