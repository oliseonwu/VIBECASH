// this component should take in the amount 
// of time the counter should run for
import { useEffect, useRef, useState,memo } from "react";
import { Text, AppState } from "react-native";
import normalize from "../utilities/normalize";
import { fetchCurrentTime } from "../utilities/CurrentTime";

const CD_Timer = (props)=>{
    // given seconds it returns hours
    // minutes and sec

    // tracks the number of sec left
    let [countState, setCountState] = useState(props.count)
    let backgroundTimestamp = useRef(null);
    let foregroundTimestamp = useRef(null);
    let isBackgroundModeOn = useRef(false) // background mode off by default

    useEffect(()=>{ 
        const subscription = AppState.addEventListener("change",handelAppStateChange);
        return ()=>{
         subscription.remove();
     }
     },[])

     useEffect(()=>{
        if(countState > 0 && AppState.currentState ==="active" || AppState.currentState ==="inactive" ){
            
           const timer = setTimeout (()=>{  
            updateTimer();
        }, 1000)

        return (()=> {clearTimeout(timer)})
    }
    // else{
    //     // // when the count goes to zero
    //     // // show the resend code bbutton
    //     // if(countState <=0){
    //     //     props.displayResendCode(true);
    //     // }
    // }
     }, [countState])
    
        
    
    const calculateDuration = (foregroundTime, backgroundTime) => {
        
        return Math.floor((foregroundTime.getTime() - backgroundTime.getTime())* 0.001);
      };

    // this function causes a re-render
    // so when current render is done, 
    // it will render again
    const updateTimer = ()=>{   
        // console.log("count state while runing: ", countState);
        setCountState((countState)=> countState - 1) 
    }
    
    
    const handelAppStateChange = async() =>{
        let tempDate = null;

        switch (AppState.currentState) {
            case 'background':
                // set background state ON
                isBackgroundModeOn.current = true;
                // save time stamp
                tempDate = await fetchCurrentTime();
                backgroundTimestamp.current = new Date(tempDate);

                console.log("counter in background mode")
                break;
            case 'active':
                onActive();
            break;
            default:
                break;
        }
    }

    // once the app comes back to
    // an active state 
    const onActive = async()=>{
        let tempDate = null;
        let minimizedDuration = null;
        // set background mode state off
        isBackgroundModeOn.current = false;
        
        // if we have a background time Stamp
        if (backgroundTimestamp.current) {
            tempDate = await fetchCurrentTime();
            foregroundTimestamp.current = new Date(tempDate);

            // if we got the forground time stamp
            if (foregroundTimestamp) {
                const backgroundDuration = calculateDuration(
                    foregroundTimestamp.current, backgroundTimestamp.current);

                minimizedDuration = backgroundDuration;
                
                backgroundTimestamp.current = null;
                foregroundTimestamp.current = null;
                console.log('App Minimized for %s seconds\n', minimizedDuration);

                // update count down based on how long we minimized the app

                // CRITICAL: we updated the state as 
                // setCountState((countState)=> countState - minimizedDuration);
                // not setCountState(countState - minimizedDuration);
                // because the first way get the most recent updates countState while
                // the second way just gets the countState in the current state
                setCountState((countState)=> countState - minimizedDuration);
              }
        }
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
        
        return <Text >
        <Text style={{fontFamily:"Inter-Light", fontSize: normalize(18), color:"#A5A5A5"}}>{"code expires in: "}</Text>
        
        <Text style={{color:"#6EC592", fontFamily: "Inter-ExtraLight", fontSize:normalize(18)}}>
        {currTimeObj.m+":"+ (currTimeObj.s< 10? "0"+currTimeObj.s: currTimeObj.s)}</Text>
       </Text>
       }
       else{
        return<Text >
        <Text style={{fontFamily:"Inter-Light", fontSize: normalize(18), color:"#A5A5A5"}}>{"code expires in: "}</Text>
        
        <Text style={{color:"#FF0000", fontFamily: "Inter-ExtraLight", fontSize:normalize(18)}}>0:00</Text>
       </Text>
       } 
    }

    return(
        displayTimer()
    );

}


export default CD_Timer;

