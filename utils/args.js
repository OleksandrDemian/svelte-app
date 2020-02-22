const parseBool = (val) => {
    return val === true || val === "true" || val === 1 || val === "1";
}

const isFlag = (value) => {
    if(value == null)
        return false;
    return value.charAt(0) === '-';
}

const parseFlags = (args) => {
    let map = {};
    for(let i = 0; i < args.length; i++){
        const arg = args[i];
        // check if value is a flag
        if(isFlag(arg)){
            //map value
            const flagName = arg.slice(1, arg.length);
            const value = args[i+1];
            
            if(isFlag(value)){
                throw "Missing value for " + flagName;
            }

            map[flagName] = value;
        }
    }

    return map;
}

const getInput = () => {
    const input = process.argv.slice(2, process.argv.length);
    const args = parseFlags(input);

    return {
        name: args["n"],
        saper: parseBool(args["s"])
    }
}

module.exports = {
    getInput
}