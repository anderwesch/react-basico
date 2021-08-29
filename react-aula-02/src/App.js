import React, { useState } from "react";

function App() {
  let [value, setValue] = useState("");
  let [itens, setItens] = useState([]);

  function handleChangeNewItem(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (value.length === 0) return;
    const newItem = {
      text: value,
      id: Date.now(),
      done: false
    }
    setItens(itens.concat(newItem));
    setValue("");
  }

  function handleChangeTodoItem(id) {
    const newItens = itens.map((item) => {
      if(item.id === id) {
        if(item.done === false) {
          item.done = true;
        } else {
          item.done = false;
        }
      }
      return item;
    });

    setItens(newItens);
    console.log(itens);
  }

  function getItensDone() {
    return itens.filter(function(item) {
      return item.done === true;
    });
  }

  function getItensUnDone() {
    return itens.filter(function(item) {
      return item.done === false;
    });
  }

  return (
    <div>
      <h3>Adicione uma tarefa</h3>
      <TodoForm value={value} handleSubmit={handleSubmit} handleChangeNewItem={handleChangeNewItem} />
      <h3>Lista de Tarefas</h3>
      <TodoItemList itens={getItensUnDone()} handleChangeTodoItem={handleChangeTodoItem} />
      <h3>Lista de Tarefas Concluídas</h3>
      <TodoItemList itens={getItensDone()} handleChangeTodoItem={handleChangeTodoItem} />
    </div>
  );
}

function TodoForm(props) {
  let { value, handleSubmit, handleChangeNewItem } = props;
  return (
    <form onSubmit={handleSubmit}>
      <input id="new-item" onChange={handleChangeNewItem} value={value} />
      <button>Adicionar</button>
    </form>
  )
}

function TodoItemList(props) {
  const { itens, handleChangeTodoItem } = props;
  return (
    <ul>
      {itens.map(item => (
        <li key={item.id}>
          <input type="checkbox" onChange={() => handleChangeTodoItem(item.id)} defaultChecked={item.done} />
          {item.text}
        </li> 
      ))}
    </ul>
  )
}

export default App;
