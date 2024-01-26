import React,{useState,useEffect} from "react";
import { Input,FormControl,FormLabel,Stack,Button } from "@chakra-ui/react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";



const baseURL = "http://127.0.0.1:8000";
const DobUpdate = () => {
    const authentication_user = useSelector((state) => state.authentication_user);
    const [birthdate, setBirthdate] = useState("");
    const [isAbove18, setIsAbove18] = useState(false);
    const [userDetails,setUserDetails] = useState()

useEffect(() => {
    return () => {
      const checkAge = () => {
        const birthdateDate = new Date(birthdate);
        const currentDate = new Date();
        const ageDifference =
          currentDate.getFullYear() - birthdateDate.getFullYear();
        setIsAbove18(ageDifference >= 18);
      };
      checkAge();
    };
  }, [birthdate]);

  useEffect(() => {
    const FetchUserdetails = async () =>{
        try {
          var data = {'username':authentication_user.name}
          const res = await axios.get(baseURL + '/api/accounts/userdetail/',{ params: data } )
    
          if (res.status === 200) {
            console.log(res.data);
            setUserDetails(res.data);
            setBirthdate(res.data.dob)
            
          }
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
    
    
      }
FetchUserdetails()
    
  }, []);


  const UpdateBirthdate = async ()=>{
    try {
        var data = { 'username':authentication_user.name,'dob':birthdate };
        const res = await axios.put(baseURL + "/api/accounts/updatedob/", 
          data,  
        );
    
        if (res.status === 202) { 
  
          console.log('dob updated successfully');
  
        } else {
          console.log('Failed to update username');
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }



  }





  return (
  <>
  
    <FormControl id="date" w={[300, 400, 500]} ml={"20px"}>
    <FormLabel>Change Date of birth</FormLabel>
    <Input
    color={'black'}
    backgroundColor={'white'}
      type="date"
      id="dob"
      value={birthdate}
      onChange={(event) => setBirthdate(event.target.value)}
      isRequired
    />
  </FormControl> 
    <Stack margin={'3%'}>
    <Button
      bg={'blue'}
      width={"60%"}
      color={"white"}
      _hover={{
        bg: "blue.500",
        color: "white",
      }}
      onClick={isAbove18 ? UpdateBirthdate : () => alert('you are underage')}
    >
      Change Date Of Birth
    </Button>
  </Stack>

  </>
   )
};

export default DobUpdate;
