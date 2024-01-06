import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import './AddSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {  CommonUtils } from '../../../utils';
import {createNewSpecialty } from '../../../services/userServices'
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';



const mdParser = new MarkdownIt();
class AddSpecialty extends Component {

        
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHtml: '',
            descriptionMarkdown: '',
            previewImgURL: ''

        }
    }
  
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHtml: html,
            descriptionMarkdown: text
        })
    }

    async componentDidMount(){
      
    }

    getDataSpecialty = async() => {
    
        let {name, imageBase64, descriptionHtml, descriptionMarkdown} = this.state;
      
        let res = await createNewSpecialty ({
            name: name,
            image: imageBase64,
            descriptionHtml: descriptionHtml,
            descriptionMarkdown: descriptionMarkdown
        })

        if(res && res.errCode === 0){
            toast.success('Lưu thông tin chuyên khoa thành công');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHtml: '',
                descriptionMarkdown: '',
                previewImgURL: ''
            })
        }else{
            toast.error('Lưu thông tin chuyên khoa thất bại')
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot){
      
    }
  

    handleOnchangeName = (event, id) => {

        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }


    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL : objectUrl,
                imageBase64: base64
            })
        }
        
        
    }


    handleClickSave = () => {
        this.getDataSpecialty()
    }

    
    openImg = () => {
        if(!this.state.previewImgURL){
            return
        }
        this.setState({
            isOpen: true,
           
        })
    }
    render() {
        
      
        
        return (

            <React.Fragment>
              

           
             <div className="add-specialty__container">
                <div className="add-specialty__title">Tạo thêm thông tin Chuyên Khoa</div>
                
                <div className="container">
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                                <label htmlFor="">Tên chuyên khoa</label>
                                <input type="text" className='form-control' 
                                
                                    value={(this.state.name)}
                                    onChange={(event) => this.handleOnchangeName(event, 'name')}
                                />
                        </div>

                        <div className="col-6  form-group">
                                <label htmlFor="">Ảnh chuyên khoa</label>
                                <div className='label-upload'>

                                    <input id="preview-img" type="file" className='file-control' hidden
                                        onChange={(event) => this.handleOnChangeImg(event)}

                                    />
                                    <label htmlFor="preview-img" className='preview-img'>Tải ảnh <i className="fas fa-upload"></i> </label>

                                    <div className="preview-imagee"
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={() => this.openImg()}
                                    > 

                                    </div>
                                </div>
                        </div>
                    <div className="col-12">
                        <MdEditor style={{ height: '500px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange} 
                                value={this.state.descriptionMarkdown}
                            /> 
                    </div>

                    <div className="col-12">
                            <button className='save-content-specialty btn btn-warning'
                            
                            onClick={() => this.handleClickSave()}
                            
                            >Lưu thông tin chuyên khoa</button>
                    </div>
                    </div>
                </div>
                        
               
             </div>
           

        

           

             {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                 } 
             
              
     
    
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialty);
