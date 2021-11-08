

const Item = function(id, datetime, memo, flag) {
  this.id = id;
  this.datetime = datetime;
  this.memo = memo;
  this.flag = flag;
}

const data = {
  // items: JSON.parse(localStorage.getItem('items')),
  items: [],
  currentItem: null,
}

function listDatetime(items) {
  let html = '';
  items.reverse().forEach(function(item){
    html += 
    `<li id="item-${item.id}" class="collection-item">
        <strong>${item.datetime} ${item.memo} ${item.flag} </strong>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-minus-square"></i>
        </a>
      </li>`;
  })
  document.querySelector('#item-list').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', listDatetimeWhenLoaded);

function listDatetimeWhenLoaded(){
  data.items = JSON.parse(localStorage.getItem('items'));
  //localStorage.setItem('items', JSON.stringify(data.items));
  if(data.items!==null){
    listDatetime(data.items);
  }
};

function clearInputs(){
  document.querySelector('#memo').value = '';
  document.querySelector('#diarrhea').checked = false;
  document.querySelector('#constipation').checked = false;
}

document.querySelector('#item-list').addEventListener('click', function(e){
  if(e.target.classList.contains('edit-item')){
    const listId = e.target.parentNode.parentNode.id;

    const listIdArr = listId.split('-');
    const id = parseInt(listIdArr[1]);
    console.log('id:', id)

    let items = JSON.parse(localStorage.getItem('items'));
    items.forEach(function(item, index){
      if(id===item.id){
        items.splice(index,1);
      }
    });
    localStorage.setItem('items', JSON.stringify(items));
  }
  listDatetimeWhenLoaded();
  e.preventDefault();
})

document.querySelector('.add-btn').addEventListener('click', function(e){

  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const datetime = date+' '+time;
  const memo = document.querySelector('#memo').value;

  let flag;
  if(document.querySelector('#constipation').checked === true) {
    flag = "constipation";
  } else if (document.querySelector('#diarrhea').checked === true){
    flag = "diarrhea";
  } else {
    flag = "";
  }

  //let ID = 0;
  //console.log(ID, datetime, memo, flag);
  // newItem = new Item(ID, datetime, memo, flag);
  // data.items.push(newItem);
  
  // if(data.items!==null){
  //   ID = data.items[data.items.length -1].id + 1;
  //   newItem = new Item(ID, datetime, memo, flag);
  //   data.items.push(newItem);
  // } else {
  //   ID = 0;
  //   newItem = new Item(ID, datetime, memo, flag);
  //   data.items[0] = newItem;
  // }

  // newItem = new Item(ID, datetime, memo, flag);
  // data.items.push(newItem);

  //let items;
  if(localStorage.getItem('items')===null) {
    data.items = [];
    ID = 0;
    newItem = new Item(ID, datetime, memo, flag);
    data.items.push(newItem);
    localStorage.setItem('items', JSON.stringify(data.items));
  } else {
    data.items = JSON.parse(localStorage.getItem('items'));
    console.log(data.items.length)
    ID = data.items[data.items.length -1].id + 1;
    newItem = new Item(ID, datetime, memo, flag);
    data.items.push(newItem);
    localStorage.setItem('items', JSON.stringify(data.items));
  }

  listDatetime(data.items);
  clearInputs();
  
  e.preventDefault();
});

document.addEventListener('keypress', function(e){
  if(e.keyCode===13 || e.which===13) {
    e.preventDefault();
    return false;
  }
});



