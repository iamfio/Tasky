import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'

export default function TasksPage() {
  const navigate = useNavigate()
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate('/login')
    }
  }, [])

  return <div>TasksPage</div>
}
