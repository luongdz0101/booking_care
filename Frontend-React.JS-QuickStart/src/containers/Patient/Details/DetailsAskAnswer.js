import React, { useEffect, useState } from 'react';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailsAskAnswer.scss'
import HomeFooter from '../../HomePage/HomeFooter';
import { getQuestion } from '../../../services/userServices';

const DetailsAskAnswer = () => {


    const[arrQuestions, setArrQuestions] = useState([]);

    useEffect( async() => {
        let res = await getQuestion();
        
        if(res && res.errCode == 0){
            setArrQuestions(res.data);
        }
    }, [])

        return (


            
            <React.Fragment>

            <HomeHeader />
                <div className="clinic-link-container mt">
                        <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="question-text">Câu hỏi cộng đồng</div>
                                <div className="question-sub">Chuyên mục chia sẻ kiến thức, giải đáp vấn đề về sức khỏe dành cho cộng đồng, được thực hiện bởi các bác sĩ và chuyên gia y tế.</div>
                            </div>
                        </div>
                        </div>
                    
                            <div className="container">
                            


                                {arrQuestions && arrQuestions.length > 0 &&
                                
                                arrQuestions.map((item, index) => {
                                    return (
                                    
                                        
                                    <div className="row mt mt-child"
                                    
                                        
                                    >
                                            
                                                <div className="col-2">

                                                
                                                    <div className="header-clinic__img"

                                                    style={{backgroundImage: `url(${item.image})`}}
                                                    
                                                    >

                                                    </div>
                                        
                                                
                                                </div>

                                                <div className="col-10">
                                                        <div className="detail-clinic__body-text">
                                                    
                                                        <div className="detail-question__text-up">
                                                            {item.name}
                                                        </div>
                                                    

                        
                                                    
                                                        </div>
                                                </div>
                                    </div>
                                        
                                        
                                

                                    )
                                })

                                
                                
                                }
                                
                            
                        </div>
                        
                </div>

            <HomeFooter />
    
            </React.Fragment>
        );
    
}



export default (DetailsAskAnswer);
