import { View, Text } from 'react-native'
import React from 'react'
import Parse from "../../parse-config";
// import { randomBytes } from 'react-native-randombytes'

// check parse DB for if an email exist
export const doesEmailExistInDB = async (email)=>{
    // return returnVal;

    const records = await getRecordsFromDB(Parse.User, "username", email);
        // console.log(records[0].get("username"));

    return records.length !== 0? true : false
}

const  getRandomNumberInRange= (min, max)=> {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateNumberList=(length)=>{
  const numArray = []

  for(var x = 1; x <= length; x++){
     numArray.push(getRandomNumberInRange(32, 126))  // good ASCII range for a password
  }

  
  return numArray;
}

// get record from table name where fieldname is === "equalTo"
export const getRecordsFromDB = async (tablename,fieldName, equalTo)=>{
    const parseQuary = new Parse.Query(tablename)
    .equalTo(fieldName,equalTo)

    let records = null;

    await parseQuary.find()
        .then((result)=>{
            records = result;
        })
        .catch((error)=>{
            console.log("Error --> parseFunction(getRecordFromDB): ", error)
        })

        return records;
}

export const sendEmail = async (email)=>{
  try {
    const result = await Parse.Cloud.run('sendVCodeAndSaveToDB', 
    {"destination": email, "channel":"email"});

    // Rember to remove in parse cloud too!!!
    console.log("REMEMBER TO REMOVE!!\nYour verification code is ", result.code);
    return result.sent;

  } catch (error) {
    console.log('Error Sending email to user: ', error);

    return false;
  }
}

export const verifyCode = async (userEmailOrPhoneNum, userCode, verificationType )=>{
  // its a unique id for a device
  const installationId = await Parse._getInstallationId();
   
    try {
      const result = await Parse.Cloud.run('verifyCodeAndGenerateSessionToken',
       {userData:userEmailOrPhoneNum, verificationType:verificationType, userCode: userCode,
       userInstallationId: installationId });
       
      console.log(result);
      return {staus: result.verificationStatus, session: result.sessionToken};
      
    } catch (error) {
      console.log('VerifyCode Error :: ', error.message);
    }
  
}

 // creates and logs in the new Parse user
export const createNewUser = async(email)=>{    
    try{
       
      const newUser = await Parse.User.signUp(email,"1234")
    }
    catch(error){
        console.log('Error creating new user: ', error);
    }
}

export const loginUsingSessionToken = (sessionToken)=>{
  Parse.User.become(sessionToken)
  .then((user)=>{
    // The user is now authenticated and set as the current user
    console.log(user.getUsername(),' logged in!');
  })
  .catch((error) => {
    console.error('Error logging in:: ', error.message);
  });
}



  export const generateRandomStr = async () =>{
    try {
      
      const result = await Parse.Cloud.run('generateRandomStr', {});
      
      return result;
    } catch (error) {
      console.log('Error generating password: ', error);
    } 
  }



  
export const logOutCurrentUser = async()=>{
    //get the currently logged in user
    const currentUser = await Parse.User.currentAsync();
    
    if(currentUser){
        await Parse.User.logOut(currentUser);

        console.log(currentUser, " Logged out!");
    }
    else{
        console.log("No User to Logout")
    }
}


// Contributors

// Olise -- olisemeduap@yahoo.com
   // logOutCurrentUser(), generatePswd()
   // someFunction()

// Kevin -- kevin@yahoo.com
   // logout(), anotherFunction()
   // someFunction()
