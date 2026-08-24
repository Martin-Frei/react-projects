
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NewsPage from './pages/NewsPage'



function App() {

  return (
    <>
     <h1 className='text-2xl bg-amber-400 text-center'>BBC Clone</h1>
     <Routes>
      <Route path= "/" element={<Home/>}/>
      <Route path= "news" element={<NewsPage/>}/>


     
      
     </Routes>
    </>
  )
}

export default App
