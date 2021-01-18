
/**
 * This class allows to save and retreive constants
 * stored as JSON in local storage
 */
class StoredConstants{

    constructor(){

        // object holding the stored constants
        this.constants = {};
        this.load();
    }

    /**
     * Add a new constant 
     * We do not allow multiple constants with the same name
     * And we do not allow overriting existing constants
     * 
     * @param {*} name 
     * @param {*} value 
     */
    add(name='', value = ''){

        // avoid overriting constant with same name
        if(this.constants.hasOwnProperty(name)){
            alert('Eine Konstante mit diesem Namen existiert bereits');
            return;
        }

        this.constants[name] = value;

    }

    /**
     * Remove a constant from the set
     * @param {*} name 
     */
    remove(name=''){

        delete this.constants[name];
        this.save();
    
    }

    /**
     * Get the value of a named constant
     * We return empty, if no constant with that name exists
     * @param {*} name 
     */
    value(name=''){

        if(this.constants.hasOwnProperty(name)){
            return this.constants[name];
        }

        return '';

    }

    /**
     * Save the constants in local storage
     */
    save(){

        localStorage.setItem('calculator-stored-constants', JSON.stringify(this.constants));
    }

    /**
     * Load the saved constants from local storage
     */
    load(){

        let con = localStorage.getItem('calculator-stored-constants');
        if(con !== null){
            this.constants = JSON.parse(con);
        }
    }

}
