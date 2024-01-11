import React, { useEffect, useState } from 'react';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailsAskAnswer.scss'
import HomeFooter from '../../HomePage/HomeFooter';
import { getQuestion } from '../../../services/userServices';
import DetailsDefault from '../DetailsDefault/DetailsDefault';

const DetailsAskAnswer = () => {


    const[arrQuestions, setArrQuestions] = useState([]);
  
    const[isOpen, setIsOpen] = useState(false)
  

   

    const close = () => {
        setIsOpen(false);
    }


    useEffect( async() => {
        let res = await getQuestion();
        

        if(res && res.errCode == 0){
            setArrQuestions(res.data);
           
        }
    }, [])

        return (


            
            <React.Fragment>

            <HomeHeader />
                < DetailsDefault 
                    title = 'Câu hỏi cộng đồng...'
                    modal = {true}
                    arrDetails = {arrQuestions}
                    setSizeImg = {true}
                />


            <HomeFooter />
    
            </React.Fragment>
        );
    
}



export default (DetailsAskAnswer);
