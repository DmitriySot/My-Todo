import React, {useEffect} from 'react'
import {Header, SearchPanel, TodoList, ItemStatusFilter, AddItem, LoginBox} from "../components";
import styled from '@emotion/styled'
import {breakpoints, getMQ, getId,deleteItemsById, getCurrentUser, getDefaultDataItem, DEFAULT_USER, getItemFromLocalStorage } from '../components/helper'

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

const defaultData = [ {label: "Drink tea", description: '' , important: false, id:0, done: false},
                    {label: "Make Awesome App", description: '' , important: false, id: 1, done: false},
                    {label: " Have a dinner", description: '' ,  important:  false, id: 2, done: false} ]

function App() {
    const [todoData, setTodoData] = React.useState<{label:string, description: string , important: boolean, id: number, done: boolean}[]>(getItemFromLocalStorage)
    const [todoFilter, setTodoFilter] = React.useState<'all' | 'done' | 'undone'>("all")
    const [todoSearch, setTodoSearch] = React.useState<string>('')
    const [isUpdate, setIsUpdate] = React.useState<boolean>(true)
    const [isLogout, setIsLogout] = React.useState<boolean>(true)

  const stringtodoData = JSON.stringify(todoData)


    React.useEffect(() => {
      const currentUser = getCurrentUser()
      const arrItems = []
      const getUserKey = localStorage.getItem(currentUser || DEFAULT_USER)
        for (let i = 0; i < localStorage.length; i++) {
          const localKey = (localStorage.key(i) || '')
          if(localKey.startsWith(getUserKey || '111') ) {
            arrItems.push(JSON.parse(localStorage.getItem(localKey)|| ''))
          }
        }
        setTodoData(arrItems)
    }, [isUpdate])

  useEffect(() => {

    if(!getCurrentUser()) {
      deleteItemsById(DEFAULT_USER)
      defaultData.forEach((item: any) => {
        console.log("__item__", item)
        localStorage.setItem(DEFAULT_USER + ":" + getId() , JSON.stringify(item) )
      })
       // console.log("__get__", getItemFromLocalStorage())
       setTodoData(getItemFromLocalStorage())
    }
  }, [isLogout])

  const onUpdate = () => {
      setIsUpdate(!isUpdate)
    }
    const onLogout = () => {
      setIsLogout(!isLogout)
    }

    const filteredData = React.useMemo(() => {
      // console.log("__todoSearch__", todoData)
      const sortItems =  (a: any, b: any) => {
          return a.id-b.id
        }

      if(todoFilter === 'all') return todoData.filter(({label, id})=> {
        return label.toLowerCase().includes(todoSearch.toLowerCase())
      }).sort(sortItems)
      return todoData
        .filter(({done, id}) => {
          return todoFilter === 'done' ? !done : done
        })
         .filter(({label})=> {
          return label.toLowerCase().includes(todoSearch.toLowerCase())
        }).sort(sortItems)
    },[todoFilter, todoData.length, todoSearch, stringtodoData ])

      const [doneCount, undoneCount] = React.useMemo(()=> {
        const done = todoData.reduce((sum, { done})=> {
          return done ? sum+1  : sum
        }, 0)
        // console.log("__sum__", 1)
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

      <LoginBox onExitClick={onLogout} onUpdate={onUpdate}/>
      <Header active={undoneCount} done={doneCount}/>
      <StyledSearchAndFilter>
        <SearchPanel onSearch={setTodoSearch}/>
        <ItemStatusFilter onFilter={setTodoFilter} activeFilter={todoFilter}/>
      </StyledSearchAndFilter>
      <TodoList todos={filteredData}
                onTogglePosition={onTogglePosition}
                onEditItem={onEditItem}
                onUpdate={onUpdate}
      />
      <AddItem  onUpdate={onUpdate}/>

    </StyledApp>
  )
}

export default App;
