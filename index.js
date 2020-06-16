
document.addEventListener("DOMContentLoaded", () => {
  
  const addItemsFormTag = document.querySelector(".add-items");
  const itemsContainerTag = document.querySelector(".items");

  const inputTag = document.querySelector("input")
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const removeButton = document.querySelector(".remove-button")
  const checkButton = document.querySelector(".check-button")

  addNewItem = e=> {
    e.preventDefault();
    const newItem = {text: e.target.item.value, done: false};
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items))   
    addAnItem(itemsContainerTag, newItem, items.length-1)
    addItemsFormTag.reset();
  }  

   const toggleDone = (e) => {   
      if (e.target.tagName ==="INPUT") {
        const itemIndex= parseInt(e.target.dataset.index);
        items[itemIndex].done = !items[itemIndex].done
        localStorage.setItem("items", JSON.stringify(items)) 
      } 
    }

    const populateItems = (plates=[], container) => {
      container.innerHTML = "";
      items.forEach( (item, i) => addAnItem(container, item, i) )    
    }

  const addAnItem = (container, item, i) => {
    const olTag= document.createElement("ol");
    const inputTag = document.createElement("input")

    inputTag.type = "checkbox";
    inputTag.name="checkbox";
    inputTag.id= `item{i}`;
    inputTag.dataset.index= i;
    item.done? inputTag.checked ='checked' : "";
    olTag.append(inputTag)

    const labelTag = document.createElement("label")
    labelTag.htmlfor=`item{i}`
    labelTag.innerText = item.text;
    olTag.append(labelTag)
    container.append(olTag)
  } 

  const removeAll = items => {
    localStorage.clear("items")
    console.log(localStorage)
    itemsContainerTag.innerHTML = "";
  }  

  const checkAll= () => {
    items.forEach(item => item.done= true)
    localStorage.setItem("items", JSON.stringify(items)) 
    itemsContainerTag.innerHTML = "";
    populateItems(items, itemsContainerTag)
  }
  addItemsFormTag.addEventListener("submit", addNewItem)
  itemsContainerTag.addEventListener("click", toggleDone)
  removeButton.addEventListener("click", removeAll)
  checkButton.addEventListener("click", checkAll)


  populateItems(items, itemsContainerTag)
})

