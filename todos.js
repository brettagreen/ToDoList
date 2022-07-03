//would think that saving the individual li html object to local storage would work.
//that would allow for completed elements to keep the strikethrough text on reload.


const form = document.querySelector("form");
const list = document.querySelector("#todo-list");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const formField = document.getElementById("item");

    const taskText = formField.value;

    let taskItem = createListItem(taskText);

    localStorage.setItem(formField.value, taskItem.outerHTML);

    formField.value = '';
});

list.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON" && e.target.innerText === "mark complete") {
        e.target.parentElement.classList.add("completed");
        const parentElement = e.target.parentElement;
        e.target.remove();
        const nodeText = parentElement.firstChild.innerText;
        const nodeObject = parentElement.outerHTML;
        localStorage.setItem(nodeText, nodeObject);
    } else if (e.target.tagName === "BUTTON" && e.target.innerText === "remove") {
        const key = e.target.parentElement.firstChild.innerText;
        localStorage.removeItem(key);
        e.target.parentElement.remove();
    }
});

window.addEventListener('DOMContentLoaded', function(e) {
    //modified code/logic as taken from https://iqcode.com/code/javascript/how-to-get-all-items-in-localstorage

    keys = Object.keys(localStorage);
    rows = keys.length;

    if (rows > 0) {
        const parser = new DOMParser();
        while (rows--) {
            console.log(localStorage.getItem(keys[rows]));
            const newLiNode = parser.parseFromString(localStorage.getItem(keys[rows]), "text/html");
            list.append(newLiNode.documentElement);
        }
    }
});

function createListItem(task) {
    //items pulled from localstorage already consist of the type of <li> Element object
    //cobbled together by the code in the 'if' statement below.
        const taskItem = document.createElement("li");
        taskItem.innerHTML = "<span>" + task + "</span>";
        list.append(taskItem);
        let doneButton = document.createElement("button");
        let removeButton = document.createElement("button");
        doneButton.id = 'done-button';
        doneButton.innerText = "mark complete";
        removeButton.innerText = "remove";

        taskItem.append(doneButton);
        taskItem.append(removeButton);

        return taskItem;
}