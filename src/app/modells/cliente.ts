import { Room } from "./room"

export class Cliente{
    id!: number
    passport?: number
    name?:string
    lastName?:string
    phone?:string
    rooms? : [Room]
}