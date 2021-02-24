import React from 'react'
import {Header, SearchPanel, TodoList, ItemStatusFilter, AddItem, LoginBox} from "../components";
import styled from '@emotion/styled'
import {breakpoints, getMQ} from '../components/helper'


const defaultData = [ {label: "Drink tea", description: '' , important: false, id:0, done: false},
                    {label: "Make Awesome App", description: '' , important: false, id: 1, done: false},
                    {label: " Have a dinner", description: '' ,  important:  false, id: 2, done: false} ]

const StyledApp = styled('div') `
  margin: 0 auto;
  min-width: 360px;
  max-width: 750px;
 
  ${getMQ(breakpoints.s)} {
    background:  beige;
    padding: 10px 5px;
  }
  ${getMQ(breakpoints.m)} {
     padding: 10px;
     background: antiquewhite;
  }
  ${getMQ(breakpoints.l)} {
    background:  bisque;
    padding: 20px 30px;
  }
`
const StyledSearchAndFilter = styled('div') `
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    
    
`
function App() {
    const [todoData, setTodoData] = React.useState<{label:string, description: string , important: boolean, id: number, done: boolean}[]>(defaultData)
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

      const newTodoItem = {label, description: '', important:  false, id, done: false }

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

    const onEditItem = (id: number, editLabel: string, description: string) => {
      const todoDataCopy = [...todoData]
      const index = todoDataCopy.findIndex((item) => {
        return id===item.id
      })
      todoDataCopy[index].label = editLabel
      todoDataCopy[index].description = description
      setTodoData(todoDataCopy)
    }

    return (
    <StyledApp>

      <LoginBox />
      <Header active={undoneCount} done={doneCount}/>
      <StyledSearchAndFilter>
        <SearchPanel onSearch={setTodoSearch}/>
        <ItemStatusFilter onFilter={setTodoFilter} activeFilter={todoFilter}/>
      </StyledSearchAndFilter>
      <TodoList todos={filteredData}
                onDelete={onDeleteItem}
                onToggleStatus={onToggleStatus}
                onTogglePosition={onTogglePosition}
                onEditItem={onEditItem}
      />
      <AddItem onAddItem={addNewItem} />

    </StyledApp>
  )
}

export default App;
