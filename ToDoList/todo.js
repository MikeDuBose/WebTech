var items = [];
var itemNum = 0;
console.log(itemNum);
function listTodos() {
    var html = '<ul>';
    for (i = 0; i < items.length; i++){
        html += '<li><span class="todoItem">' + items[i] + '</span><a href="#" class="deleteItem"> Finished! </a>' + '</li>';
    };
    //html += '</ul>';

    document.getElementById('items').innerHTML = html;
    var todoItem = document.getElementsByClassName('todoItem');

    // loop through all items in the array and add the event listener
    for (i = 0; i < todoItem.length; i++) {
        // Set id to uniquely identify each todo item
        todoItem[i].id = 'todoItem-' + i;
        id = todoItem[i].id;
    }

    // Function to remove todo items if "Finished" is clicked
    var deleteItems = document.getElementsByClassName('deleteItem');
    for (i = 0; i < deleteItems.length; i++) {
        deleteItems[i].id = i;
        deleteItems[i].addEventListener('click', remove);

    };
}

function remove(event) {
    items.splice(event.target.id, 1);
    listTodos();
    itemNum --;
    console.log(itemNum + "Removed")
    return false;
}

document.getElementById('add').addEventListener('click', add);

function add() {
    var task = document.getElementById('entry').value;
    if(task != '' && itemNum != 6){
        items.push(task);
        itemNum ++;
        console.log(itemNum + "Added")
        listTodos();
        return false;
    }

    return false;
}
