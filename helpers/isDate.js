const { isValid } = require("date-fns");

const isDate = ( value ) => {

    if(!value){
        return;
    }

    if(isValid(value)){
        return true;
    } else {
        return false;
    }


}

module.exports = {
    isDate
}