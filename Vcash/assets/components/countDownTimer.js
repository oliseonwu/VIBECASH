// this component should take in the amount 
// of time the counter should run for
import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import normalize from "../utilities/normalize";

const CD_Timer = (props)=>{
    // given seconds it returns hours
    // minutes and sec
    let count = useRef(props.count)
    let [countState, setCountState] = useState(props.count)

    // this function causes a re-render
    // so when current render is done, 
    // it will render again
    const updateTimer = ()=>{    
        let temp = countState -1;
        setCountState(temp);    
    }

    // Very bad!!!! because --- the first render keeps controlling countState value of later renders 
    // useEffect(() => {
        
    //     const timer= setInterval(() => {           // this repeats.
    //         if(countState > 0){                    
                
    //             setCountState((countState)=>countState-1);       
    //             // Notice the way we update this state var
    //             // we take what ever was stored in the 
    //             // countState as (time), then we update
    //             // it "time-1"
    //         }
    //         else{
    //             clearInterval(timer)
    //         }
            
    //      }, 1000);

    //  }, []);
    // This is bad because when we update a state value,
    // it causes a re-render of the component but, in this 
    // case, even tho we updated the state in this first render,
    // the change doesn't update in the first render but in the 
    // next render. So this means that the first render 
    // will go on forever because of our setInterval and our 
    // countState -->(that doesn't update until the next render). 
    // on the front end the timer will update properly because
    // of setCountState((countState)=>countState-1) which kind
    // of keeps track of our through countState value but its not 
    // propagated the change to every where in the project until the next render. 
    // Remeber that the setCountState causes re-renders so the new re-
    // renders will have the updated countState displayed but in the back-
    // ground whats causing the rerenders is the zombie first render instead 
    // of every new render caused by the previous render.
   

    if(countState > 0){

        const timer = setInterval(()=>{
        updateTimer();

        // we clear the setInterval because when the view is rerendered
        // we dont want the previous render to cause more renders
        // ONLY OUR CURRENT RENDER SHOULD CAUSE ONLY THE NEXT 
        // RENDER!!(I mean the setInterval from the previous render will 
        // still run unless we clearInterval(timer))
        clearInterval(timer)
    }, 1000);    
    }

    
        
    



    const secondsToTime = (secs)=>{
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    };

    const displayTimer = ()=>{
       const currTimeObj = secondsToTime(countState);

       if(countState > 0){
        return <Text style={{lineHeight:0}}>
        <Text style={{fontFamily:"Inter-Light", fontSize: normalize(17)}}>{"code expires in "}</Text>
        
        <Text style={{color:"#FF0000", fontFamily: "Inter-ExtraLight", fontSize:normalize(18)}}>
        {currTimeObj.m+":"+ (currTimeObj.s< 10? "0"+currTimeObj.s: currTimeObj.s)}</Text>
       </Text>
       }
       else{
        return<Text style={{color:"#FF0000", fontFamily:"Inter-Light",
         fontSize: normalize(17)}}>{"Code is expired."}</Text>
       }
       
       
    }

    return(
        displayTimer()
    );

}

export default CD_Timer;

