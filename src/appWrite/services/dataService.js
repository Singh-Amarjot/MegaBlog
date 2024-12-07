import {Client,Account,Databases,ID,Storage, Query} from "appwrite"

// creating the database service class 

class DataService {
     client
     databases
     bucket

     // setting up the constructor 
     constructor(){
        this.client = new Client().setEndpoint(import.meta.env.VITE_APPWRITE_URL)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

        this.databases = new Databases(this.client);

        this.bucket = new Storage(this.client);

     }

     // defining database methods  ==> CRUD OPERATIONS 
               
     createPost = async ({title,content,slug , status,userId , featuredImage 
     })=>{// slug is being used as the document id 
          try {
            const newPost = await this.databases.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    status,
                    userId,
                    featuredImage
                }
              )
              // if post created  return the post details 
              if(newPost){
                return newPost;
              }
          } catch (error) {
            console.log(`appWrite :: dataCreation Error:: ${error.message}`);
          }
     }

     updatePost = async(slug,{title,content,featuredImage,status})=>{
       try {
        const  IsUpdated = await this.databases.updateDocument( import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        slug,{
            title,
            content,
            status,
            featuredImage
        });

        if(IsUpdated){
            // if post updated 
            return IsUpdated;
        }
       } catch (error) {
        console.log(`appWrite :: dataUpdation  Error:: ${error.message}`);

       }
     }


     // delete post method 
     deletePost =async (slug)=>{
        try {
                 const isDeleted = await this.databases.deleteDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                    slug) ;

                    if(isDeleted){
                        // if post deleated successfully 
                        return isDeleted;
                    }else{
                        return false;
                    }
        } catch (error) {
            console.log(`appWrite :: dataDeletion ::  Error:: ${error.message}`);

        }
     }

     // get post 
     getPost = async(slug)=>{
         try {
             const post = await this.databases.getDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                slug);

                if(post){
                    // if post exists 
                    return post;
                }else{
                    return null;
                }
         } catch (error) {
            console.log(`appWrite :: dataReading  ::  Error:: ${error.message}`);
            
         }
     }

     // get all posts 
     getAllPosts = async(queries=[Query.equal("status", "active")])=>{
try {
    const posts = await this.databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          queries );

          // if posts exist
          if(posts){
            return posts;
          }else{
            return null;
          }
} catch (error) {
    console.log(`appWrite :: dataReading  ::  Error:: ${error.message}`);
    
}
     }
     // get all user posts
     getUserPosts = async(userId,queries=[Query.equal("userId",userId)])=>{
        try {
            const posts = await this.databases.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                  queries );
    
                  if(posts){
                    // if posts exist 
                    return posts;
                  }else{
                    return null;
                  }
        } catch (error) {
    console.log(`appWrite :: dataReading  ::  Error:: ${error.message}`);
            
        }
     }

     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////// storage (bucket related methods )////////////////////////////////////////////

    uploadFile = async (file) => {
        try {
           const uploadedFile = await this.bucket.createFile(
               import.meta.env.VITE_APPWRITE_BUCKET_ID, 
               ID.unique(), 
               file
           );
           if(uploadedFile){
               return uploadedFile;
           }
        } catch (error) {
           console.log("Appwrite service :: uploadFile :: error", error.message);
        }
    }

 deleteFile = async(fileId)=>{
        try {
            const isDeleted = await this.bucket.deleteFile(import.meta.env.VITE_APPWRITE_BUCKET_ID,fileId);
            if(isDeleted){
                // if file deleted successfully 
                return true ;
            }else{
                return false;
            }
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error",error.message);
        }
 }
 getFilePreview = async (fileId) => {
    return await this.bucket.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId
    )
}

}

// creating and exporting an object of the dataService class
 const dataService = new DataService();

 export default dataService;