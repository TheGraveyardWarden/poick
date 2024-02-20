//in the compare page we got 2 phones for default
//the defealt value of searchBar is compare page with the 2 phones
//since the document is rtl, phone 1 is right, phone 2 is left
//make the OSelectedRight and OSelectedLeft match the phones

function defealtValues(){
    
}
var phone1,phone2;
'header variables';{
var searchBarContainer = document.getElementById('searchBarContainer');
var phoneHeader = document.getElementById('phoneHeader');
var overallUseB = document.getElementById('overallUseB');
var header = document.getElementById('header');
var poickTitle = document.getElementById('poickTitle');
var openSB = document.getElementById('openSB');
var searchBarText = document.getElementById('searchBarText');
var searchBar = document.getElementById('searchBar');
var OAdvanced = document.getElementById('OAdvanced');
var OSelectedLeft = document.getElementById('OSelectedLeft');
var OSelectedRight = document.getElementById('OSelectedRight');
var ORecomended = document.getElementById('ORecomended');
var OCCheck = document.getElementById('OCCheck');
var ORecent = document.getElementById('ORecent');
var OSearch = document.getElementById('OSearch');
var OResults = document.getElementById('OResults');
var OCExit = document.getElementById('OCExit');
var OOAdvanced = document.getElementById('OOAdvanced');
var OOAdvancedClose = document.getElementById('OOAdvancedClose');
var PMLGo = document.getElementsByClassName('PMLGo');
var PMLCompare = document.getElementsByClassName('PMLCompare');
var PMLAdd = document.getElementsByClassName('PMLAdd');
var phoneModule = document.getElementsByClassName('phoneModule');
var FPDownIcon = document.getElementById('FPDownIcon');
var FPDoneIcon = document.getElementById('FPDoneIcon');
var FPContainer = document.getElementById('FPContainer');
var FPPlaceHolder = document.getElementById('FPPlaceHolder');
var FPriceOverview = document.getElementById('FPriceOverview');
var SBIData; 
}
document.addEventListener("DOMContentLoaded",resetSearchBar);
document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        closeSearchBar();
        if (window.scrollY < 250) {
            searchBarContainer.style.display = 'flex';
            phoneHeader.style.display = 'none';
            overallUseB.style.display = 'flex';
            poickTitle.style.flex = '1';
        } else {
            searchBarContainer.style.display = 'none';
            phoneHeader.style.display = 'flex';
            overallUseB.style.display = 'none';
            poickTitle.style.flex = 'none';
        }
    });
});
document.addEventListener('click', function(event) {
    if (
        (openSB && !openSB.contains(event.target)) &&
        (searchBarContainer && !searchBarContainer.contains(event.target))
    ) {
        closeSearchBar()
    }
});
function SBClear(){
    if (SBInput.value.trim() == ''){
        closeSearchBar();
        resetSearchBar();
    }else if (SBInput.value.trim() !== ''){
        SBInput.value = '';
        OShifter();
    }
}
SBInput.addEventListener('keydown', onSearch);
function onSearch(e) {
    const searchUrl = `http://localhost:9000/search?q=${e.target.value}`;
    fetch(searchUrl)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => { 
        console.log('error while searching:', err);
    })
}
SBInput.addEventListener('input' , OShifter);
function OShifter(){
    var SBIData = SBInput.value.trim();
    if (SBIData !== ''){
        ORecent.style.display = 'none';
        OSearch.style.display = 'block';
        console.log('2');
        //searches and shows the result in OSearch
    }else if (SBIData == ''){
        ORecent.style.display = 'block';
        OSearch.style.display = 'none';
        console.log('3');
    }
}
function OAShifter(){
    if(OAdvanced.style.display === 'none'){
        OAdvanced.style.display = 'block';
    }else if(OAdvanced.style.display === 'block'){
        OAdvanced.style.display = 'none';
    }
}
function openSearchBar(){
    searchBarText.style.display = 'flex';
    searchBar.style.display = 'none';
    SBInput.focus();
    openSB.style.top = '48px';
}
function closeSearchBar(){
    searchBarText.style.display = 'none';
    searchBar.style.display = 'flex';
    openSB.style.top = 'var(--OSBTop)';
}
function resetSearchBar(){
    OSearch.style.display = 'none';
    OAdvanced.style.display = 'none';
    OResults.style.display = 'block';
    if(document.querySelector('title').innerHTML  == 'Compare'){
        OSelectedLeft.style.display = 'Block';
        OSelectedRight.style.display = 'Block';
        OResults.style.display = 'none';
    }else if(document.querySelector('title').innerHTML == 'info'){
        OSelectedLeft.style.display = 'none';
        OSelectedRight.style.display = 'none';
    }
    SBInput.value = '';
    defealtValues();
}
function compareExit(){
    OSelectedLeft.style.display = 'none';
    OSelectedRight.style.display = 'none';
    OResults.style.display = 'block';
}
function headerMouseOut(){
    if (window.scrollY > 250 && searchBar.style.display === 'flex'){
        searchBarContainer.style.display = 'none';
        phoneHeader.style.display = 'flex';
        overallUseB.style.display = 'none';
        poickTitle.style.flex = 'none';
    }
}
function headerMouseOver(){
    if (window.scrollY > 250){
        searchBarContainer.style.display = 'flex';
        phoneHeader.style.display = 'none';
        overallUseB.style.display = 'flex';
        poickTitle.style.flex = '1';
    }
}

function addPhoneCompare(){
    console.log('addPhone');
    if(OSelectedLeft.style.display == 'none'){
        OSelectedLeft.style.display = 'block';
        //add this phone to the OSelectedLeft
    }else{
        OSelectedRight.style.display = 'block';
        //add this phone to OSelectedRight
        /*
        if(atleast 1 of the new phone is diffrent than the ones in the current page){
            OCCheck.style.display = 'flex';
        }
        */
    }
}
function compareCheck(){
    //opens a new compare page with these 2 new phones a default phones
}
function OSRemovePhone(element){
    if(element.parentNode.parentNode ==  OSelectedRight){
        OSelectedRight.style.display = 'none';
    }else if(element.parentNode.parentNode == OSelectedLeft){
        if(OSelectedRight.style.display == 'block'){
            OSelectedRight.style.display = 'none';
            //moves the Right phone to the left to open space for the right hand searchBar
        }else{
            OSelectedLeft.style.display = 'none';
        }
    }
    OShifter()
}
const config = {attributes: true, attributeFilter: ['style']};
function OOptions(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            console.log('1');
            OOFix();
        }
    }
};
function OOFix(){
    console.log('2');
    if(OSelectedLeft.style.display == 'block'){
        eachDisplay(PMLGo, 'none');
        eachDisplay(PMLCompare, 'none');
        eachDisplay(PMLAdd, 'block');
        eachOnClick(phoneModule, addPhoneCompare);
        OCExit.style.display = 'flex';
        OOAdvanced.style.display = 'none';
        OOAdvancedClose.style.display = 'none';
        console.log('2.5');
        if(OSelectedRight.style.display == 'none'){
            OSelectedLeft.style.width = 'auto';
            OSelectedRight.style.width = 'auto';
            OResults.style.display = 'block';
            console.log('3');
        }else if(OSelectedRight.style.display == 'block'){
            OSelectedLeft.style.width = '100%';
            OSelectedRight.style.width = '100%';
            OResults.style.display = 'none';
            console.log('4');
        }
    }else{
        eachDisplay(PMLGo, 'block');
        eachDisplay(PMLCompare, 'block');
        eachDisplay(PMLAdd, 'none');
        eachOnClick(phoneModule, openPhone);
        OCExit.style.display = 'none';
        console.log('5');
        if(OAdvanced.style.display == 'block'){
            OOAdvanced.style.display = 'none';
            OOAdvancedClose.style.display = 'flex';
            console.log('6');
        }else{
            OOAdvanced.style.display = 'flex';
            OOAdvancedClose.style.display = 'none';
            console.log('7');
        }
    }
}
function eachDisplay(element, val){
    for(var i = 0; i < element.length; i++){
        element[i].style.display = val;
    }
}
function eachOnClick(element, val){
    for(var i = 0; i < element.length; i++){
        element[i].onclick = val;
    }
}
function openPhone(phoneID){
    //opens phone's page
}
const observer = new MutationObserver(OOptions);
document.addEventListener("DOMContentLoaded",observer.observe(OSelectedLeft, config));
document.addEventListener("DOMContentLoaded",observer.observe(OSelectedRight, config));
document.addEventListener("DOMContentLoaded",observer.observe(OAdvanced, config));
// observer.disconnect();
function openPriceSelector(){
    console.log('a');
    if(FPContainer.style.display == 'none'){
        console.log('b');
        FPContainer.style.display = 'block';
        FPDownIcon.style.display = 'none';
        FPDoneIcon.style.display = 'block';
        FPDoneIcon.style.fill = 'var(--green)';
    }else{
        console.log('d');
        FPContainer.style.display = 'none';
        FPDownIcon.style.display = 'block';
        FPDoneIcon.style.display = 'none';
    }
}
//ask about this shit down here
//its for the priceSelector
//ye like no shit //coded it my self
document.addEventListener('click', function(event) {
    console.log('c');
    if (FPriceOverview && !FPriceOverview.contains(event.target)) {
        console.log('d');
        FPContainer.style.display = 'none';
        FPDownIcon.style.display = 'block';
        FPDoneIcon.style.display = 'none';
    }
});
function toggleScroll(a){
    var div = document.getElementById(a);
    var moreDB = div.querySelector('.moreDB');
    var closeB = div.querySelector('.closeB');
    var nextDiv = div.nextElementSibling;
    if (nextDiv.style.display === 'none' || nextDiv.style.display === ''){
        nextDiv.style.display = 'flex';
        nextDiv.style.height = 'auto';
        moreDB.style.display = 'none';
        closeB.style.display = 'flex';
    }
    else{
        nextDiv.style.display = 'none';
        nextDiv.style.height = '0';
        moreDB.style.display = 'flex';
        closeB.style.display = 'none';
    }
}
// let phoneCon = document.querySelector('.phoneModuleContainer');
// fetch('http://api.poickphone.com/get_phones').then(res => {
//     phoneCon.innerHTML += `<div class="phoneModule" onclick="openPhone(this)">
//                                 <div class="PMRight">
//                                     <img class="PMImage" src="icons/S23UltraT.png">
//                                     <div class="PMNames">
//                                         <div class="PMNameFA PMName">${res[i].fa_name}</div>
//                                         <div class="PMNameEN PMName">${res[i].en_name}</div>
//                                     </div>
//                                 </div>
//                                 <div class="PMLeft">
//                                     <svg Class="PMLIcon PMLGo" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="m560.5-243-238-238 238-238 41 41.5L405-481l196.5 196.5-41 41.5Z"/></svg>
//                                     <svg Class="PMLIcon PMLCompare" onclick="addPhoneCompare()" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 -960 960 960"><path d="M424.5-45v-79.5H182q-22.969 0-40.234-17.266Q124.5-159.031 124.5-182v-596q0-22.969 17.266-40.234Q159.031-835.5 182-835.5h242.5V-915H482v870h-57.5ZM182-224h242.5v-277.5L182-224Zm357.5 99.5V-497L778-224v-554H539.5v-57.5H778q22.969 0 40.234 17.266Q835.5-800.969 835.5-778v596q0 22.969-17.266 40.234Q800.969-124.5 778-124.5H539.5Z"/></svg>
//                                     <svg Class="PMLIcon PMLAdd" onclick="addPhoneCompare()" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M450-450.5H206.667v-60H450v-243.333h60V-510.5h243.333v60H510v243.333h-60V-450.5Z"/></svg>
//                                 </div>
//                             </div>`
// })