import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './pages/Layout'
import RegisterPage from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/Account'

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true; // Ensure credentials are sent with every request

function App() {
  return (
    <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />}/>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account/:subpage?' element={<Account />} />
            <Route path='/account/:subpage/:action' element={<Account />} />
            </Route>
        </Routes>
    </UserContextProvider>
  )
}

export default App
