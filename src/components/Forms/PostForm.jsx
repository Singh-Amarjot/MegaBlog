import  { Button,RTE,Select,Input } from '../index';
import React, { useEffect,useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import dataService from '../../appWrite/services/dataService';
import { useNavigate } from 'react-router-dom';
import { loadPosts } from '../../store/postSlice';

function PostForm({ post }) {  
    // console.log(post);
  // getting the required fields from the useForm hook 
  const [imgUrl,setImgUrl] = useState("image");
const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);
  const { register, handleSubmit, control ,setValue,getValues,watch,reset} = useForm();
  useEffect(() => {
    // Reset the form with new post data whenever the post prop changes
    reset({
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.$id || "",
        status: post?.status || "active"
    }
);
     if( post && post.featuredImage){
        dataService.getFilePreview(post.featuredImage).then((url)=>{
            // console.log(url)
            setImgUrl(url)
        })
   
     }
}, [post, reset]);
  const refreshStore =  async ()=>{
    const posts = await dataService.getAllPosts();
    if(posts.documents.length>0){
         dispatch(loadPosts(posts.documents))
    }
   }

  // creating the submit method , which will save the post in the database 
  // there are two scenarios .. 1st that user might be creating a new post and 2nd can be if user is updating or editing the post 
  // if post data has been passed as a prop , it means the user wants to edit the post 
  // so in that case  first chk if the post is there and then upload the image file first , delete the old image from the bucket and replace the new fields with the old post fields 

  const submit = async (data) => {
      if (post) {
          const file = data.image[0] ? await dataService.uploadFile(data.image[0]) : null;

          if (file) {
              dataService.deleteFile(post.featuredImage);
          }

          const dbPost = await dataService.updatePost(post.$id, {
              ...data,
              featuredImage: file ? file.$id : undefined,
          });

          if (dbPost) {
            refreshStore();
              navigate(`/post/${dbPost.$id}`);
          }
      } else {
          const file = await dataService.uploadFile(data.image[0]);

          if (file) {
              const fileId = file.$id;
              data.featuredImage = fileId;
              const dbPost = await dataService.createPost({ ...data, userId: userData.$id });

              if (dbPost) {
                refreshStore();
                  navigate(`/post/${dbPost.$id}`);
              }
          }
      }
  };


  // setting up a method to change the title into  a slug
  // this method will be called everytime the title value is changed , which will be monitered by watch from rhf

  const slugTransform = useCallback( (value)=>{
      if(value && typeof(value)==="string"){
         const slug = value.trim()
                           .toLowerCase()
                           .replace()
                           .replace(/[^a-zA-Z\d\s]+/g, "-")
                           .replace(/\s/g, "-");
                           return slug;
      }else{
       return "";
      }
},[]);

useEffect(() => {
  const subscription = watch((value, { name }) => {
      if (name === "title") {
          setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
  });

  return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);

  return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
          <div className="w-2/3 px-2">
              <Input
                  label="Title :"
                  placeholder="Title"
                  className="mb-4"
                  {...register("title",{required:true})}
              />
              <Input
                  label="Slug :"
                  placeholder="Slug"
                  className="mb-4"
                  {...register("slug", { required: true })}
                 
              />
              <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
          </div>
          <div className="w-1/3 px-2">
              <Input
                  label="Featured Image :"
                  type="file"
                  className="mb-4"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
              />
              { post &&(
                  <div className="w-full mb-4">
                      <img
                          src={ imgUrl}
                          alt={post.title}
                          className="rounded-lg"
                      />
                  </div>
              )}
              <Select
                  options={["active", "inactive"]}
                  label="Status"
                  className="mb-4"
                  {...register("status", { required: true })}
              />
              <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                  {post ? "Update" : "Submit"}
              </Button>
          </div>
      </form>
  )   
}

export default PostForm