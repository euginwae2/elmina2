console.log('asset view detail')

const assetDetail = document.getElementById('asset-detail');
const detailViews = document.getElementsByClassName('detail-views');
const assetViewToggle = document.getElementsByClassName("asset-toggle");
const attributeView = document.getElementById('attributeView');
const eventView = document.getElementById('eventView');
//console.log('asset toggle here ', assetViewToggle);

document.addEventListener('click',(event) => {
    if (event.target.className == "listItem") {
        //console.log(event.target.id);
    }
    else { false}
});

Array.prototype.forEach.call(assetViewToggle,(asset) => {
    
    asset.addEventListener('click', (event) => {
        deselectAllToggle(assetViewToggle);
        selectToggle(event.target);
        console.log(event.target.id);
        hideAllDetailViews(detailViews)
        if(event.target.id == 'attribute-toggle')
        {
            showDetailView(attributeView);
        }
        else 
        {
            showDetailView(eventView);
        }
    })
});

function selectToggle(arg) {
    arg.classList.add('is-selected');
}

function deselectToggle(arg) {
    arg.classList.remove('is-selected');
}

function deselectAllToggle(args) {
    Array.prototype.forEach.call(args,(arg) => {
        deselectToggle(arg);
    });
}

function showDetailView(arg) {
    arg.classList.add('is-shown');
}

function hideAllDetailViews(args) {
    Array.prototype.forEach.call(args, (arg) => {
        hideDetailView(arg);
    })
}

function hideDetailView(arg) {
    arg.classList.remove('is-shown');
}