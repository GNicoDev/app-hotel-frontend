import { Room } from "./room"

export class Customer{
    id?: number
    passport?: string
    name?:string
    lastName?:string
    phone?:string
    rooms? : [Room]
}