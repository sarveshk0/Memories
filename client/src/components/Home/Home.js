
import React,{useState}from 'react'
import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import {Container,Grid,Grow, Paper,AppBar,TextField,Button} from '@mui/material'
 import { useDispatch} from 'react-redux'

import Pagination from '../Pagination/Paginate.js'
import {useNavigate,useLocation}  from 'react-router-dom';
import { getPostsbysearch } from '../../features/Posts/postsSlice.js'
import './style.css'



 



function useQuery(){
  return new URLSearchParams(useLocation().search);
 }


const Home = () => {


 
const navigate=useNavigate();
const dispatch=useDispatch();
const [currentId, setCurrentId] = useState(null);
const [search,setSearch]= useState('');

const query=useQuery();
// const history=useHistory();
const page=query.get('page') ||1;
 
console.log('page',page);
const searchquery=query.get('searchquery')

//  const posts=useSelector((state)=>state.posts.posts)
//  console.log('posts',posts);
 





  


      const handleKeyPress=(e)=>{
        if(e.keyCode===13){
          searchPost();
        }

      }
  
       const searchPost=(e)=>{
                 e.preventDefault();
               dispatch(getPostsbysearch(search));
               navigate(`/posts/search?searchquery=${search}`|| 'none')
       }
    
      

      


  return (
    
    <Grow in>
    <Container maxWidth='xl'>
      <Grid container justify="space-between" alignItems="stretch" spacing="8">
            <Grid item xs={12} sm={6} md={9} className='gridcontainer'>
                  <Posts setCurrentId={setCurrentId}  />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppBar className='appBarSearch' position="static" color="inherit">
              <TextField 
              onKeyDown={handleKeyPress} 
              name="search" 
              variant="outlined"
               label="Search Memories" 
               fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
            
              <Button onClick={searchPost} className='searchButton' variant="contained" color="primary">Search</Button>
            </AppBar>

            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchquery ) && (
              <Paper className='pagination' elevation={6}>
                <Pagination page={page} />
                </Paper>
            )}
            </Grid>

      </Grid>
    </Container>

   </Grow>
  )
}

export default Home