const parseBool = (val) => {
    return val === true || val === "true" || val === 1 || val === "1";
}

const isFlag = (value) => {
    if(value == null)
        return false;
    return value.charAt(0) === '-';
}

const checkDefaults = (valuesMap, validators) => {
    for(let prop of Object.keys(validators)){
        if(valuesMap[prop] == null){
            if(validators[prop].default != null){
                valuesMap[prop] = validators[prop].default;
            } else if(validators[prop].type === Boolean){
                valuesMap[prop] = false;
            }
        }
    }

    return valuesMap;
}

const checkAccepted = (valuesMap, validators) => {
    for(let prop of Object.keys(validators)){
        const accepts = validators[prop].accepts;
        if(accepts != null){
            if(valuesMap.hasOwnProperty(prop)){
                if(!accepts.includes(valuesMap[prop])){
                    throw valuesMap[prop] + " is not a valid input for " + prop;
                }
            }
        }
    }
}

const parseFlags = (args, validators) => {
    let map = {};
    for(let i = 0; i < args.length; i++){
        const arg = args[i];

        if(isFlag(arg)){
            const flagName = arg.slice(1, arg.length);
            const value = args[i+1];
            const validator = validators[flagName];

            let fValue = null;

            if(validator.type === String){
                if(isFlag(value)){
                    throw "Missing value for " + flagName;
                } else {
                    map[flagName] = value;
                }
            } else if(validator.type === Boolean){
                if(isFlag(value) || value == null){
                    map[flagName] = true;
                } else {
                    map[flagName] = parseBool(value);
                }
            }
        }
    }

    return checkDefaults(map, validators);
}

const getInput = (validation) => {
    const input = process.argv.slice(2, process.argv.length);
    const args = parseFlags(input, validation);
    checkAccepted(args, validation);

    return {
        name: args["n"],
        saper: args["s"],
        bundler: args["b"]
    }
}

module.exports = {
    getInput
}