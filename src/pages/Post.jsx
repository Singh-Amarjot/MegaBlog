import React, { useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dataService from '../appWrite/services/dataService';
import {Button} from "../components/index"
import parse from "html-react-parser"
import { Container } from '../components';
import { Link } from 'react-router-dom';
import { loadPosts } from '../store/postSlice';
function Post() {

// when the user will access this post page , there are two options 
// one is that he has the permission to delete and edit the post .. or not 
// to check whetehr the user can access these permissions we need to check whether the post is posted by him or not 
// or wther the postdata has that users' userid or not 
// so first fetch the user data and post data 
// fetch the post data using the slug passed to the post path 

const {slug} = useParams();
const [ myPost,setMyPost] = useState({});
const dispatch = useDispatch();
const userData = useSelector(state => state.auth.userData)
const postData = useSelector(state=>state.postSlice.posts);
const [imagUrl,setImageUrl] = useState('post image')
const navigate = useNavigate();
// you need to filter the data of posts to get the paticular post 
useEffect(() => {
    const loadPost = async () => {
        // First check if we have a slug
        if (!slug) {
            navigate('/');
            return;
        }

        // Check if we have posts data
        if (!postData || postData.length === 0) {
            return; // Wait for posts to load
        }

        // Find the specific post using find instead of map
        const foundPost = postData.find(post => post.$id === slug);
        
        if (!foundPost) {
            navigate('/');
            return;
        }

        // Set the post first
        setMyPost(foundPost);

        // Then fetch the image if we have a featured image
        if (foundPost.featuredImage) {
            try {
                const url = await dataService.getFilePreview(foundPost.featuredImage);
                setImageUrl(url);
            } catch (err) {
                console.error('Error loading image:', err);
            }
        }
    };

    loadPost();
}, [slug, postData, navigate]);

 const isAuthor = userData && postData ? userData.$id === myPost.userId : false

 const refreshStore =  async ()=>{
  const posts = await dataService.getAllPosts();
  if(posts.documents.length>0){
       dispatch(loadPosts(posts.documents))
  }
 }
 const deletePost = () => {
    dataService.deletePost(myPost.$id).then((status) => {
        if (status) {
            dataService.deleteFile(myPost.featuredImage);

            // need to update the state in the store 
            refreshStore();
            navigate("/");
        }
    });
};  

// console.log(myPost)
return myPost ? (
    <div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={imagUrl}
                    alt={myPost.title}
                    className="rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${myPost.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{myPost.title}</h1>
            </div>   
            <div className="browser-css">
            {myPost.content ? parse(myPost.content) : ''}                </div>
        </Container>
    </div>
) : <div>post not available </div> ;
}

export default Post