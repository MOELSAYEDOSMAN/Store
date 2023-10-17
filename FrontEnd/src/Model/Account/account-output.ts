import { Data } from "@angular/router"

export interface AccountOutput {
  isLogin:boolean
  error:boolean
  message:string
  token:string
  roles:string[]
  userName:string
  email:string
  exToken:Data
}
