import {Client,Account,ID} from "appwrite"

// creating the authService class

class AuthService {
   client
   account 

   // setting up the constructor 
   constructor(){
    // console.log(import.meta.env.VITE_APPWRITE_URL);
    this.client = new Client().setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    this.account = new Account(this.client);
   }

   // defining the auth methods 
   signup = async ({name,email,password})=>{
  
    try {
        const newUser =  await  this.account.create(ID.unique(),email,password,name)

        // if user is created log the user in 
        if(newUser){
           
          return await  this.login({email,password});
        }else{
         return null;
        }
    } catch (error) {
        console.log(`appWrite signup Error::${error.message}`);
    }
   }

    /// login method 

    login = async ({email,password})=>{
         try {
            const session =  await this.account.createEmailPasswordSession(email,password);

            if(session){
                // if session created // login successful // return the user info 
                return session;
            }
         } catch (error) {
            console.log(`appWrite login Error::${error.message}`);
         }
    }


    // current user method 
    getUserInfo = async()=>{
        try {
            const currentUser = await this.account.get();
            if(currentUser){
                // if current user exists 
                return currentUser;
            }else{
                return null;
            }
        } catch (error) {
            console.log(`appWrite getUser  Error::${error.message}`);

        }
    }

    // logout method 
    logout = ()=>{
     try {
        this.account.deleteSessions();
     } catch (error) {
        console.log(`appWrite logout  Error::${error.message}`);
     }
    }

}

// creating the authService object 
const authService = new AuthService();

export  default authService;