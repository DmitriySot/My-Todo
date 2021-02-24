export const breakpoints = { xxl: 1920, xl: 1200, l: 750, m: 550, sm: 450, s: 360 };

export const getMQ = (breakpoint: number | string, isMax?: boolean) => {
  return `@media (${isMax ? 'max' : 'min'}-width: ${breakpoint}px)`;
};
export const  getId = () => {
  return '_' + Math.random().toString(36).substr(2, 5);
};

export const getCurrentUser = () => {
  return localStorage.getItem('currentUser')

}

export const userNameLogged = () => {
    const user = getCurrentUser()
    if(user)  return user.split(":")[0]
   console.log("__getCurrentUser__", getCurrentUser())
}
