const process = require("process");
const readline = require("readline");

const stdout = process.stdout;

const DEFAULT_SPINNERS = [ "[♥]", "[ ]" ];

const HIDE_CURSOR = () => {
    stdout.write("\x1B[?25l");
}

const SHOW_CURSOR = () => {
    stdout.write("\x1B[?25h");
}

class Spinner {

    constructor({ message, spinners, wrapMessage }){
        this.message = message;
        this.intervalId = null;
        this.wrapMessage = wrapMessage;
        this.spinners = spinners || DEFAULT_SPINNERS;
    }

    start(){
        let index = 0;
        const spinners = this.spinners;

        HIDE_CURSOR();

        this.intervalId = setInterval(() => {
            if(index >= spinners.length){
                index = 0;
            }
    
            const curChar = spinners[index];
            stdout.write(curChar);
            stdout.write(" ");
            stdout.write(this.message);

            if(this.wrapMessage === true){
                stdout.write(" ");
                stdout.write(curChar);
            }
    
            readline.cursorTo(stdout, 0);
            index ++;
        }, 250);

        return this;
    }

    stop(){
        clearInterval(this.intervalId);
        this.intervalId = null;

        SHOW_CURSOR();

        return this;
    }

}

const create = ({ message, wrapMessage }) => {
    return new Spinner({ message, wrapMessage });
}

module.exports = {
    create,
    SHOW_CURSOR,
    HIDE_CURSOR
};