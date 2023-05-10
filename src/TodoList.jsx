import './TodoList.css';
import icon from "./assets/clipboardpng.webp";
import { useState } from 'react';

const TodoList = () => {
    const [lista, setLista] = useState([]);
    const [novoItem, setNovoItem] = useState("");

    const adicionaItem = (form) => {
        form.preventDefault();
        if(!novoItem) {
            return alert("Enter a task");
        }
        setLista([...lista, {text: novoItem, isCompleted: false}]);
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    const clicou = (index) => {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }
    
    const deleteTask = (index) => {
        const listAux = [...lista];
        listAux.splice(index, 1)
        setLista(listAux)
    }
    
    const deleteAll = () => {
        setLista([])
    }

    return(
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input 
                    id='input-entrada'
                    type="text"
                    placeholder='Adicione uma tarefa'
                    value={novoItem}
                    onChange={(e) => {setNovoItem(e.target.value)}}
                />
                <button className='add' type="submit">Add</button>
            </form>
            <div className='listaTarefas'>
                {
                    lista.length < 1
                    ?
                    <img className='img' src={icon} alt="Todo List icone" />
                    : 
                    lista.map((task, index) => 
                        <div key={index} className={task.isCompleted ? 'item completo' : 'item'}>
                            <span onClick={() => {clicou(index)}}>{task.text}</span>
                            {/* {console.log("item " + task.text + " index " + index)} */}
                            <button onClick={() => {deleteTask(index)}} className='del'>Deletar</button>
                        </div>      
                    )
                }
                {
                    lista.length > 0 &&            
                    <button onClick={deleteAll} className='deleteAll'>Deletar Todas</button>
                }
            </div>
        </div>
    )
}
export default TodoList;