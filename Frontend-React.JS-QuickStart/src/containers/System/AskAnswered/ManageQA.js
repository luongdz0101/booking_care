import React, {useState} from 'react';
import { createNewQuestion } from '../../../services/userServices';
import { toast } from 'react-toastify';
import ManageDefault from '../Admin/ManageDefault';
import InputForm from '../../../components/InputFrom/InputForm';


const ManageQA = () => {


        
        const getDataQuestion = async(data) => {

                let res = await createNewQuestion ({
                    name: data.name,
                    image: data.image,
                    descriptionHtml: data.descriptionHtml,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                if(res && res.errCode === 0){
                    toast.success('Lưu thông tin chuyên khoa thành công');
               

                }else{
                    toast.error('Lưu thông tin chuyên khoa thất bại')
                }
        
        }
        

     
        return (

         
           
            
            <React.Fragment>

         
                <ManageDefault 
                    getDataQuestion = {getDataQuestion}
                    title = 'Thêm mới hỏi đáp'
                    name = 'Tên câu hỏi'
                    placeholder = 'VD: Tôi hay bõ bữa....'
                    isOpenInput = {false}
                />

               
             
    
            </React.Fragment>
        );
    
}



export default (ManageQA);
