import React from 'react'
import {Header, SearchPanel, TodoList, ItemStatusFilter, AddItem } from "../components";
import './style.css'


const loginBox = <span>Login please</span>
const welcomeBox = <span>Hello User</span>
const isLogged = false;

const defaultData = [ {label: "Drink tea", important: false, id:0, done: false},
  {label: "Make Awesome App" , important: false, id: 1, done: false},
  {label: " Have a dinner", important:  false, id: 2, done: false}
]

function Index() {
    const [todoData, setTodoData] = React.useState<{label:string, important: boolean, id: number, done: boolean}[]>(defaultData)
    const [todoFilter, setTodoFilter] = React.useState<'all' | 'done' | 'undone'>("all")
    const [todoSearch, setTodoSearch] = React.useState<string>('')

    const onDeleteItem = (id: number) => {
        console.log("__id__", id )
       const filteredData = todoData.filter((item) => {
           return   id !== item.id

        })
        setTodoData(filteredData)
    }

    const onToggleStatus =(id: number, type: 'done' | 'important') => {

        const copy = [...todoData]
        const indexLabel = copy.findIndex((item) => {
            return id === item.id
        })
        copy[indexLabel][type] = !copy[indexLabel][type]

        setTodoData(copy)
    }

    const addNewItem = (label: string) => {
      const id = todoData[todoData.length-1].id + 1;
      const newTodoItem = {label, important: false, id, done: false }

      setTodoData([...todoData, newTodoItem])
      console.log("__todoData__", todoData)

    }

    const filteredData = React.useMemo(() => {
      console.log("__todoSearch__", todoData)
      if(todoFilter === 'all') return todoData.filter(({label})=> {
        return label.toLowerCase().includes(todoSearch.toLowerCase())
      })
      return todoData
        .filter(({done}) => {
          return todoFilter === 'done' ? !done : done
        })
         .filter(({label})=> {
          return label.toLowerCase().includes(todoSearch.toLowerCase())
        })
    },[todoFilter, todoData.length, todoSearch ])

    const [doneCount, undoneCount] = React.useMemo(()=> {
      const done = todoData.reduce((sum, { done})=> {
      return done ? sum+1  : sum
      }, 0)
      console.log("__sum__", 1)
      return [done, todoData.length-done]
    },[JSON.stringify(todoData)])


    return (
    <div className="app">
      {isLogged ? welcomeBox : loginBox}
      <Header active={undoneCount} done={doneCount}/>
      <div className="searchAndFilter">
        <SearchPanel onSearch={setTodoSearch}/>
        <ItemStatusFilter onFilter={setTodoFilter} activeFilter={todoFilter}/>
      </div>
      <TodoList todos={filteredData}
                onDelete={onDeleteItem}
                onToggleStatus={onToggleStatus}
      />
      <AddItem onAddItem={addNewItem} />
    </div>
  )
}

export default Index;
