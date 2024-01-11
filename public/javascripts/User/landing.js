function menuslidein(){
    const sidebar = document.getElementById('sidebar')
    sidebar.classList.remove("-translate-x-[250px]")
    sidebar.classList.add("translate-x-[0px]")
    document.getElementById("sidebarcontainer").style.visibility="visible"
}
function closesidebar(){
    const sidebar = document.getElementById('sidebar')
    sidebar.classList.add("-translate-x-[250px]")
    sidebar.classList.remove("translate-x-[0px]")
    document.getElementById("sidebarcontainer").style.visibility = "hidden"
}