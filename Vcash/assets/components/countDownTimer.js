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
        
    //     const timer= setInterval(() => {           // this repeats
    //         if(countState > 0){                    // countState will always be 120 because  variable within the setInterval callback, 
    //                                                // it refers to the initial value of countState that was captured when the 
    //                                                // useEffect hook was first run. 
    //                                                // so changing the state value doesn't affect the if condition
                
    //             setCountState((countState)=>countState-1);        // set setCountState updated well but  caues new rerenders.
    //                                                               //   Even if there are new re-renders, the first render 
    //                                                               //   keep calling more re-renders
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

    if(countState > 0){

        const timer = setInterval(()=>{
        updateTimer();

        // we clear the setInterval because when the view is rerendered
        // we dont want the previous render to cause more renders
        // ONLY OUR CURRENT RENDER SHOULD CAUSE ONLY THE NEXT 
        // RENDER!!
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

       return <Text>
        <Text style={{fontFamily:"Inter-Light", fontSize: normalize(17)}}>{"code expires in "}</Text>
        
        <Text style={{color:"#FF0000", fontFamily: "Inter-ExtraLight", fontSize:normalize(18)}}>
        {currTimeObj.m+":"+ (currTimeObj.s< 10? "0"+currTimeObj.s: currTimeObj.s)}</Text>
       </Text>
       
    }

    return(
        displayTimer()
    );

}

export default CD_Timer;
