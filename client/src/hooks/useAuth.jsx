import { useSelector } from 'react-redux'


const useAuth=()=> {
    const { currentUser} = useSelector((state) => state.user);

    let isAdmin= false;
    if(currentUser !== null && currentUser.role === "admin"){
        isAdmin=true;
        return isAdmin
    }
    return isAdmin;
    
  
}

export default useAuth