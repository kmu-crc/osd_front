import React from 'react'
const MenuContext = React.createContext({ hide: false, larger: false })

export const MenuProvider = MenuContext.Provider
export const MenuConsumer = MenuContext.Consumer

export default MenuContext
