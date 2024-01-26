'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSelector } from "react-redux";

const baseURL = "http://127.0.0.1:8002";
const SocketContext = createContext()

export const useSocket = () => {
	return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const authentication_user = useSelector((state) => state.authentication_user);
	const [socket, setSocket] = useState()
	const user = useSelector((state) => {
		return authentication_user.name
	})

	useEffect(() => {
		if (!user) return
		const newSocket = io(baseURL, {
			withCredentials: true,
			auth: {
				token: user?.accessToken || 'error',
			},
			reconnection: true,
			reconnectionDelay: 500,
			reconnectionAttempts: Infinity,
			transports: ['websocket'],
		})
		setSocket(newSocket)

		return () => newSocket.disconnect()
	}, [user])

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}