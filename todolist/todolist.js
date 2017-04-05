var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [] ;
render(list);

var addBtn = document.getElementById('add');
var text = document.getElementById('input');

addBtn.addEventListener('click',add);
text.addEventListener('keydown',function(e){
    if(e.key === 'Enter') add()
})

function render(l){
    var listBody = document.getElementById('list');

    l = l.sort((a,b) => {
        return a.isfinish - b.isfinish
    })

    listBody.innerHTML = l.reduce((p,v,i) => {
        return p += renderFragment(v,i)
    }, '')

    localStorage.setItem('todo',JSON.stringify(l))
}

function renderFragment(todo,i){
    return '<div class="item ' + (todo.isfinish ? 'isfinish' : 'unfinish') + ' ">\
    <div class = "fuck" onclick = "fuck(' + i + ')">\
        <span class="' + (todo.isfinish ? 'finish' : 'nofinish' ) + '"></span>\
    </div>\
    <div class = "text" onclick = "edit(' + i + ')" >\
        <p class="task">'+ todo.text +'</p>\
    </div>\
    <div class = "delete" onclick = "del(' + i + ')">\
        <span class="del">X</span>\
    </div>\
    </div>'
}

function add(){
    var inputText = document.getElementById('input').value;
    var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [] ;

    if(!inputText) return

    var newTodo = {
        text : inputText,
        isfinish : false
    }
     list.push(newTodo) ;
     document.getElementById('input').value = '' ;
     render(list)
}

function del(i){
    var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [] ;
    list.splice(i,1)
    render(list)
}

function edit(i){
    var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [] ;
    if(list[i].isfinish) return
    var newText = prompt('编辑')
    if(newText){
        list[i].text = newText;
        render(list)
    }
}

function fuck(i){
    var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [] ;
    list[i].isfinish = !list[i].isfinish;
    render(list);
}