// This component takes in the name of the screen
// and a reference to an input field as prop
// then it focus on the input field if the 
// page is just being seen for the first time

import { isPageVisitedContex } from './visitedPagesListContex';
import { useContext } from 'react';
const AutoInputFocus = (prop) => {
    let isPageAlreadyVisited =  useContext(isPageVisitedContex);
    let visitPageFunc = isPageAlreadyVisited.visitPage
    isPageAlreadyVisited = isPageAlreadyVisited.screenListVisitState[prop.pageName];

    if(!isPageAlreadyVisited){  
        
        // auto focus after some time
        // after the view is visible
        setTimeout(() => {
            prop.inputRef.current.focus()
            }, 500);

            // set page visited
            visitPageFunc(prop.pageName)
    }
    
    
}

export default AutoInputFocus;