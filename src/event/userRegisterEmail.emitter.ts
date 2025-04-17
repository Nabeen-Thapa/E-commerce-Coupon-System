import {EventEmitter} from "events";

class emailEmmiter extends EventEmitter{}
export const userRegisterEmail = new emailEmmiter();