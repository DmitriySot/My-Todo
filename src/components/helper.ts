
export const breakpoints = { xxl: 1920, xl: 1200, l: 750, m: 550, sm: 450, s: 360 };

export const getMQ = (breakpoint: number | string, isMax?: boolean) => {
  return `@media (${isMax ? 'max' : 'min'}-width: ${breakpoint}px)`;
};
export const  getId = () => {
  return '_' + Math.random().toString(36).substr(2, 5);
};

export const getCurrentUser = () => {
  return localStorage.getItem('currentUser' )
}
export const getCurrentUserKey = (user?: string) => {
  const currentUser = user || getCurrentUser()
  return localStorage.getItem(currentUser || '') || DEFAULT_USER
}

export const userNameLogged = () => {
    const user = getCurrentUser()
    if(user)  return user.split(":")[0]
   // console.log("__getCurrentUser__", getCurrentUser())
}

export const getDefaultDataItem = (label: string) =>{
  const currentUserItems = getItemFromLocalStorage()
  const maxId = currentUserItems.map((item:any) => {
    return item.id
  })

  const id = Math.max(...maxId) + 1
  console.log("__id__", id)
  return {label, description: '' , important: false, id , done: false}
}

export const DEFAULT_USER = "defaultUser"

export const getItemFromLocalStorage = () => {
  const userKey = getCurrentUserKey()
  const arrItems: any[] = []
  for(let i = 0; i < localStorage.length; i++) {

    const localKey = (localStorage.key(i) || '')

    if ((localStorage.key(i) || '').startsWith(userKey)) {
       arrItems.push(JSON.parse(localStorage.getItem(localKey) || ''))
    }
  }
  return arrItems
}

export const getItemKeyById = (id: any) => {
  const userKey = getCurrentUserKey()
  const item = Object.entries(localStorage).find((item) => {
    // console.log("__item[0]__", item[0])
    if (item[0].startsWith(userKey)   && JSON.parse(item[1]).id === id) return true
  })
  console.log("__item__", item)
  return item ?  item[0] : ''
}

export const deleteItemsById = (userId: string) => {
  const itemsLength = localStorage.length
  for(let i = 0; i < itemsLength; i++) {
    if((localStorage.key(i)||'').startsWith(userId)) {
      console.log("__localStorage.key(i)__", localStorage.key(i))
      localStorage.removeItem((localStorage.key(i))||'')
      --i
    }
  }
}
