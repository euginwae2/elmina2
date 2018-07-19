'use status'

var modeles = require('../models');

class Status {
    constructor(){}

    getStatus () { 
        return  new Promise(function(resolve,reject) {
            var select = document.createElement('select');
            select.setAttribute('id', 'newValueSelect');
            modeles.EqpStatus.findAll()
            .then((res) => {
                Array.prototype.forEach.call(res,(x) => {
                    var opt = document.createElement('option');
                    opt.value = x.name;
                    opt.innerHTML = x.name;
                    select.appendChild(opt);
                })
            })
            .then(resolve(select))
            .catch(reject(error))
            })
    }
    
}

module.exports = Status;