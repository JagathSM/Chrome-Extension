let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // As we need localStorage to store saved data even after page refreshing or coming to chrome again. 
const tabBtn = document.getElementById("tab-btn");



if(leadFromLocalStorage){
    myLeads = leadFromLocalStorage;
    render(myLeads);
}

// writing function to grab the url of current tab using chrome API, 
tabBtn.addEventListener("click", function(){
    
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
});


// writing function to represent list of saved url's as a link.
function render(leads){
    let listItems = "";
    for(let i = 0;i < leads.length; i++){
        listItems += `
            <li> 
                <a  target='_blank' href='${leads[i]}'>
                ${leads[i]}
                </a> 
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}


// writing function to save manually inputed url for the button 'SAVE INPUT'
inputBtn.addEventListener("click", function(){ // it is same as onclick
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
})

// 'DELETE ALL' button double click functiont to clear local Stoarge, myLeadds, and DOM.
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})


