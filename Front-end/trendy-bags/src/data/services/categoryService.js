import axios from "axios";

export const getCategories=async()=>{
    try{
        const response=await axios.get('http://localhost:5161/api/Categories');
        return response.data;
    }catch(error){
        console.error("there was an error fetching categories:",error);
        throw error;
    }
    
}