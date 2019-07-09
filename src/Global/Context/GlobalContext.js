import React from 'react'
const MenuContext = React.createContext({ hide: false, theme:"white-red" })

export const MenuProvider = MenuContext.Provider
export const MenuConsumer = MenuContext.Consumer

export default MenuContext
