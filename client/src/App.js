import { Container } from '@mui/material'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
const App = () => {





  return (
   
      <div className='bg-slate-300'>
           <BrowserRouter>
               
               <Container maxWidth='xl'>
                <Navbar/>
                 <Routes>
                   
                 <Route path="/" element={<Navigate to="/posts" replace />} />
          
                   <Route path="/posts" element={<Home/>} ></Route>
                   <Route path="/posts/search" element={<Home/>} ></Route>
                    
                   <Route path="/posts/:id" element={<PostDetails/>} ></Route>
                   <Route path='/auth' element={<Auth/>}></Route>
          
                 </Routes>
               </Container>
              </BrowserRouter>
      </div>
   

  
   
  
   
  
  

    
  )
}

export default App