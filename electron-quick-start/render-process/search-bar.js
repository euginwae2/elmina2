var searchBar = document.getElementById('searchBar');
var assetList = document.getElementById('assetList');

console.log('serachBar.js')
searchBar.addEventListener('keyup', (event) => {
    console.log(searchBar.value);
    removeAllDesearch(assetList.children)
    search(assetList.children,searchBar.value)
})



function desearch (arg) {
    arg.classList.add('de-searched')
}

function removeDesearch (arg) {
    arg.classList.remove('de-searched')
}

function removeAllDesearch (args) {
    Array.prototype.forEach.call(args, (arg) => {
        removeDesearch(arg)
    })
}

//Where the magic happens
function search(list, params) {
    Array.prototype.forEach.call(list, (listItem) =>{
        if((listItem.textContent.match(params)) == null) {
            desearch(listItem)
        }
    })
}

