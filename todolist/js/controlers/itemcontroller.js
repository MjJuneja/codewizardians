window.addEventListener("load",function(){
window.addEventListener("load",function(){
    document.getElementById("addBt").addEventListener("click",addNewitem);
    document.getElementById("search").addEventListener("click",searchItem);
    
    document.getElementById("delete").addEventListener("click",deleteMarkItems);
    document.getElementById("sortBt").addEventListener("click",sortByPrice);
    document.getElementById('saveBt').addEventListener('click', saveItems);
    document.getElementById('loadBt').addEventListener('click',loadItems);
});
function sortByPrice(){
    itemOperations.sortByPrice();
    printItems(itemOperations.itemList);
}
function deleteMarkItems(){
    itemOperations.deleteMarkitems();
    printItems(itemOperations.itemList);
}

function searchItem(){
    var price=parseInt(document.getElementById("price").value);
    var subArray=itemOperations.searchItem(price);

    printItems(subArray);
}

function printItems(itemArray){
    clearTable();
      itemArray.forEach(printRow);
}

function clearTable(){
      document.getElementById("itemTableBody").innerHTML="";
}


function addNewitem(){
    var itemName = document.getElementById("itemname").value;
    var itemDesc = document.getElementById("desc").value;
    var price = document.getElementById("price").value;
    var url = document.getElementById("url").value;
            
    itemOperations.addItem(itemName,itemDesc,price,url);
    //stores value of lass element of the array
        var lastItemObject = itemOperations.itemList[itemOperations.itemList.length-1];
    printRow(lastItemObject);
}



function printRow(itemObject){
    var tableBody=document.getElementById("itemTableBody");
    var row=tableBody.insertRow();
    var index=0;
    var id=0;
  for(var key in itemObject){
      if(key=='id'){
          id=itemObject[key];
      }
      if(key=='markForDeletion'){
          continue;
      }
      if(key=='url'){
          row.insertCell(index).innerHTML="<img src='"+itemObject[key]+"' width='100' height='100'>";
      }
      else{
       row.insertCell(index).innerHTML = itemObject[key]; 
         
        }
      index++;
  }
    
    //operations
    var deleteImg = document.createElement("img");
    deleteImg.src="images/delete.png";
    deleteImg.className="showcursor";
     var editImg = document.createElement("img");
    editImg.src="images/edit.png";
    editImg.className="showcursor";
    var td = row.insertCell(index);
    td.append(deleteImg);
    deleteImg.addEventListener("click",markForDeletion);
    deleteImg.setAttribute("data-params",id);
    td.append(editImg);
   
}


function markForDeletion(event){
    var id=event.srcElement.getAttribute("data-params");
    itemOperations.markUnmark(id);
    //event is the event happening on element and parentElement is parent of that element
    //here event is on the dustbin icon and its parent is td and then again its parent tr
   var currentTr=event.srcElement.parentElement.parentElement;
   
    currentTr.classList.toggle("showred");
}


function saveItems(){
    if(window.localStorage){

        //JSON has two functions
        //stringify : to covert to json format
        //parse :  to get the json to a object 
        var json = JSON.stringify(itemOperations.itemList);

        console.log(json);
        localStorage.items = json;
    }
    else{
        alert('Your browser donot support localStorage');
    }
}

function loadItems(){
    if(window.localStorage){
        if(localStorage.items){
            itemOperations.itemList = JSON.parse(localStorage.items);
            printItems(itemOperations.itemList);
        }
        else{
            alert('No such data saved');
        }
    }
    else{
        alert('Your browser donot support localStorage');
    }
}

