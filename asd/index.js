var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []
render(list)

var addBtn = document.getElementById('addBtn')
var textarea = document.getElementById('textarea')

addBtn.addEventListener('click', add)

textarea.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') add()
})

function render (l) {
  var listBody = document.getElementById('list')

  l = l.sort((a, b) => {
    return a.isFinish - b.isFinish
  })

  listBody.innerHTML = l.reduce((p, v, i) => {
    return p += renderFragment(v, i)
  }, '')

  localStorage.setItem('todo', JSON.stringify(l))
}

function renderFragment (todo, i) {
  return '<div class="item ' + (todo.isFinish ? 'finish' : 'unfinish') + '"> \
    <div class="finish" onclick="fin(' + i + ')"> \
      <span class="circle ' + (todo.isFinish ? 'finish-circle' : '') + '"></span> \
    </div> \
    <div class="text" onclick="edit(' + i + ')"> \
      <p>' + todo.text + '</p> \
    </div> \
    <div class="operation" onclick="del(' + i + ')"> \
      <span>X</span> \
    </div> \
    </div>'
}

function add () {
  var inputText = document.getElementById('textarea').value
  var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []

  if (!inputText) return

  var newTodo = {
    text: inputText,
    isFinish: false
  }

  list.push(newTodo)

  document.getElementById('textarea').value = ''

  render(list)
}

function del (i) {
  var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []
  
  list.splice(i, 1)

  render(list)
}

function fin (i) {
  var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []
  
  list[i].isFinish = !list[i].isFinish

  render(list)
}

function edit (i) {
  var list = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []

  if (list[i].isFinish) return

  var newText = prompt('编辑：' + list[i].text, list[i].text)

  if (newText) {
    list[i].text = newText
    render(list)
  }
}
