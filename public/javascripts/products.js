function deletepopup(){
    document.getElementById("deletepopup").style.display="flex";
}
function canceldeletepopup(){
    document.getElementById("deletepopup").style.display="none";
}
function scrollToSection(sectionId) {
    document.getElementById("section1").style.display="flex";
    var section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}