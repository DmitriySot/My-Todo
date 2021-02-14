import React from 'react'
import {Header, SearchPanel, TodoList, ItemStatusFilter, AddItem,LoginBox } from "../components";
import './style.css'


const loginBox = <span>Login please</span>
const welcomeBox = <span>Hello User</span>
const isLogged = false;

const defaultData = [ {label: "Drink tea", important: false, id:0, done: false},
                    {label: "Make Awesome App" , important: false, id: 1, done: false},
                    {label: " Have a dinner", important:  false, id: 2, done: false} ]

function App() {
    const [todoData, setTodoData] = React.useState<{label:string, important: boolean, id: number, done: boolean}[]>(defaultData)
    const [todoFilter, setTodoFilter] = React.useState<'all' | 'done' | 'undone'>("all")
    const [todoSearch, setTodoSearch] = React.useState<string>('')

  const stringtodoData = JSON.stringify(todoData)

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

      const id = todoData.length ?  Math.max(...todoData.map(({id}) => id)) + 1  : 0

      const newTodoItem = {label, important: false, id, done: false }

      setTodoData([...todoData, newTodoItem])
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
    },[todoFilter, todoData.length, todoSearch, stringtodoData ])



    const [doneCount, undoneCount] = React.useMemo(()=> {
      const done = todoData.reduce((sum, { done})=> {
      return done ? sum+1  : sum
      }, 0)
      console.log("__sum__", 1)
      return [done, todoData.length-done]
    },[stringtodoData])

    const onTogglePosition = (id: number, direction: string) => {
      const copyTodo = [...todoData]
      const currentId = copyTodo.findIndex((item) => {
       return item.id === id
      })

       const chunkTodo = copyTodo.splice(currentId, 1)
       copyTodo.splice(direction === "up" ? currentId-1 : currentId+1,0,  ...chunkTodo )
       setTodoData(copyTodo)


    }

    return (
    <div className="app">
      <LoginBox />
      <Header active={undoneCount} done={doneCount}/>
      <div className="searchAndFilter">
        <SearchPanel onSearch={setTodoSearch}/>
        <ItemStatusFilter onFilter={setTodoFilter} activeFilter={todoFilter}/>
      </div>
      <TodoList todos={filteredData}
                onDelete={onDeleteItem}
                onToggleStatus={onToggleStatus}
                onTogglePosition={onTogglePosition}
      />
      <AddItem onAddItem={addNewItem} />
    </div>
  )
}

export default App;
