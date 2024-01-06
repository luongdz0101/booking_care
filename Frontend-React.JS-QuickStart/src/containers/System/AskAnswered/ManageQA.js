import React, { useState, useEffect  } from 'react';

import {  CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-markdown-editor-lite/lib/index.css';
import { createNewQuestion } from '../../../services/userServices';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();


const ManageQA = () => {

        const [inputs, setInputs] = useState({});
        const [previewImgURL, setPreviewImgURL] = useState('');
        const [imageBase64, setImageBase64] = useState('');
        const [isOpen, setIsOpen] = useState(false);
        const [descriptionHtml, setDescriptionHtml] = useState('');
        const [descriptionMarkdown, setDescriptionMarkdown] = useState('');


        const  handleOnChangeImg = async (event) => {
            let data = event.target.files;
            let file = data[0];
            if(file){
                let base64 = await CommonUtils.getBase64(file);
                let objectUrl = URL.createObjectURL(file);

                setPreviewImgURL(objectUrl);
                setImageBase64(base64);
            }
            
            
        }

        const openImg = () => {
           
            if(!setPreviewImgURL){
                return
            }
            setIsOpen(true)
        }


        const handleEditorChange = ({ html, text }) => {
         
            setDescriptionHtml(html)
            setDescriptionMarkdown(text)
         
        }

           
    

        const handleChange = e => {
            setInputs(prevState => ({ ...prevState, [e.target.name] : e.target.value }));
        } 

      

        const getDataQuestion = async() => {

                let res = await createNewQuestion ({
                    name: inputs.name,
                    image: imageBase64,
                    descriptionHtml: descriptionHtml,
                    descriptionMarkdown: descriptionMarkdown
                })

                if(res && res.errCode === 0){
                    toast.success('Lưu thông tin chuyên khoa thành công');
                    setInputs({});
                    setDescriptionHtml('');
                    setDescriptionMarkdown('');
                    setPreviewImgURL('');

                }else{
                    toast.error('Lưu thông tin chuyên khoa thất bại')
                }
        
        }
        

       const handleClickSave = () => {
            getDataQuestion()
       }
        return (

         
           
            
            <React.Fragment>

         
                <div className="medical-facilities__container">
                    <div className="m-s-title">
                            Thêm nội dung hỏi đáp
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                    <label htmlFor="">Tên câu hỏi </label>
                                    <input type="text" className='form-control' 
                                        name='name'
                                        value={inputs.name || ''}
                                        onChange={handleChange}
                                        
                                    />
                            </div>
                            

                            <div className="col-6  form-group">
                                    <label htmlFor="">Ảnh chuyên khoa</label>
                                    <div className='label-upload'>
                                        <input id="preview-img" type="file" className='file-control' hidden
                                            onChange={(event) => handleOnChangeImg(event)}

                                        />
                                        <label htmlFor="preview-img" className='preview-img'>Tải ảnh <i className="fas fa-upload"></i> </label>

                                        <div className="preview-imagee"
                                            style={{backgroundImage: `url(${previewImgURL})`}}
                                            onClick={ openImg}
                                        > 

                                        </div>
                                    </div>
                            </div>

                            <div className="col-12">
                                <MdEditor style={{ height: '500px' }} 
                                        renderHTML={text => mdParser.render(text)} 
                                        onChange={handleEditorChange} 
                                        value={descriptionMarkdown}
                                    /> 
                            </div>
                            <div className="col-12 mt-5">
                                <button className='save-content-specialty btn btn-warning'
                                
                                onClick={handleClickSave}
                                
                                >Lưu thông tin hỏi đáp</button>
                            </div>
                        </div>
                        
                    </div>
                       
                   
                </div>

                {isOpen && 
                    <Lightbox
                        mainSrc={previewImgURL}
                        onCloseRequest={() => setIsOpen(false)}
                    />
                 } 
             
    
            </React.Fragment>
        );
    
}



export default (ManageQA);
