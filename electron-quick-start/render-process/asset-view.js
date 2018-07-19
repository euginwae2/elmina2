'user strict'

var models = require('../assets/models');
const attributeForm = document.getElementById('attributeForm');
const PopUp = require('../assets/classes/popUp');

console.log('asset view renderer');

/**
 * Generate Asset detail display boxes and inputs
 */
models.Field.all()
.then(field => {
    
    Array.prototype.forEach.call(field,(x) => {
        console.log('field type:', x.type)

        var element = document.createElement('div');
        element.setAttribute('class', 'col-8');
        var element2 = document.createElement('div')
        var fieldName = document.createTextNode(x.name);
        element2.appendChild(fieldName);
        element.appendChild(element2);

        var textType = document.createElement('input');
        textType.setAttribute('type','text');
        //textType.setAttribute('disabled','disabled');
        textType.setAttribute('id', 'field_'+ x.dbName);
        textType.setAttribute('class', 'dataField');
        element.appendChild(textType);
        attributeForm.appendChild(element);
        console.log(x.name, 'added');
        textType.addEventListener('click',(event) => {
            let id = document.getElementById('field_core_id');
            var popUp = new PopUp();
            popUp.show(event,id.value);
            console.log(event.target.id, id.value + ' clicked');
        })

    })
    
})
