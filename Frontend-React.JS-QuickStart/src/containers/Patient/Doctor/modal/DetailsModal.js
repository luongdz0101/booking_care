import React, { useState, useEffect  } from 'react';
import { getQuestionById } from '../../../../services/userServices';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';



const DetailsModal = (props) => {

    let {isOpenModal, closeModal, questionId, title } = props
    const[dataModal, setDataModal] = useState('');



    useEffect (async() => {

        let res = await getQuestionById({
            id: questionId
        });
        let data = res.data;
        if(res && res.errCode === 0){
            setDataModal(data.descriptionHtml);
        }
    }, [])
    return(

        
        <React.Fragment>
               
            <Modal isOpen={isOpenModal} 
                size='xl'
                
            >
                <ModalHeader toggle={closeModal}>{title}</ModalHeader>
                <ModalBody>
                  {dataModal && 
                  
                  
                    <div dangerouslySetInnerHTML={{__html: dataModal }}></div>
                  }
                </ModalBody>
                
            </Modal>
        </React.Fragment>
    )
    
}



export default (DetailsModal);
