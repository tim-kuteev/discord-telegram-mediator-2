import { Logger } from "../logger";

export class ConsoleLogger implements Logger {
    public info(message: string): void {
        console.log(timestamp() + " " + message);
    }
}

function timestamp() {
    const date = new Date();
        return "[" 
        + date.getHours().toString().padStart(2, "0") 
        + ":" 
        + date.getMinutes().toString().padStart(2, "0") 
        + ":" 
        + date.getSeconds().toString().padStart(2, "0")
        + "." 
        + date.getMilliseconds().toString().padEnd(3, "0").substr(0,3) 
        + "]";
}