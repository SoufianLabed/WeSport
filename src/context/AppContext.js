import React , {useState}  from 'react'

const AppContext = React.createContext()

export const AppProvider = ({children}) =>{
    
    const [userLogged, setUserLogged] = useState(null)
    return (
        <AppContext.Provider value={{ userLogged, setUserLogged }}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContext
