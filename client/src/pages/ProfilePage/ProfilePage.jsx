import { useEffect } from 'react'
import { useContext } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import './ProfilePage.css'

function ProfilePage() {
  const navigate = useNavigate()
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate('/login')
    }
  }, []) 
  
  return (
    <div>
      <h1>Profile page</h1>
    </div>
  )
}

export default ProfilePage
