import {createContext, useEffect,useState} from "react"
import { useSelector } from "react-redux"
import {io} from "socket.io-client"

export const SocketContaxt = createContext()

export const SocketContextProvider = ({children})=>{
    const {user} = useSelector((state)=>state.auth)
    const [socket, setSocket] = useState(null);
    useEffect(()=>{
        setSocket(io("http://localhost:4000"))
    },[]);

    useEffect(()=>{
        user && socket?.emit("newUser",user.id)
    },[user,socket])

    return(
        <SocketContaxt.Provider value={{socket}}>
            {children}
        </SocketContaxt.Provider>
    )
}