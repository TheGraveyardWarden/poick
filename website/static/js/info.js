function toggleScroll(a){
    var div = document.getElementById(a);
    var moreDB = div.querySelector('.moreDB');
    var closeB = div.querySelector('.closeB');
    var nextDiv = div.nextElementSibling;
    if (nextDiv.style.display == 'none' || nextDiv.style.display == ''){
        nextDiv.style.display = 'flex';
        moreDB.style.display = 'none';
        closeB.style.display = 'flex';
    }
    else{
        nextDiv.style.display = 'none';
        moreDB.style.display = 'flex';
        closeB.style.display = 'none';
    }
}