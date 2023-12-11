import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import './ManageMedicalFacilities.scss';
import {  CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { createNewMedicalFacilities } from '../../../services/userServices';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt();


class ManageMedicalFacilities extends Component {

        
    constructor(props){
        super(props);
        this.state = {
            previewImgURL: '',
            name: '',
            imageBase64: '',
            descriptionHtml: '',
            descriptionMarkdown: '',
            address: ''
          
        }
    }
  

    async componentDidMount(){
     
    }

    getDataMedicalFacilities = async() => {
    
        let {name, imageBase64, descriptionHtml, descriptionMarkdown, address} = this.state;
      
        let res = await createNewMedicalFacilities ({
            name: name,
            image: imageBase64,
            descriptionHtml: descriptionHtml,
            descriptionMarkdown: descriptionMarkdown,
            address: address
        })

        if(res && res.errCode === 0){
            toast.success('Lưu thông tin chuyên khoa thành công');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHtml: '',
                descriptionMarkdown: '',
                previewImgURL: '',
                address: ''
            })
        }else{
            toast.error('Lưu thông tin chuyên khoa thất bai')
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot){
      
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHtml: html,
            descriptionMarkdown: text
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

    openImg = () => {
        if(!this.state.previewImgURL){
            return
        }
        this.setState({
            isOpen: true,
           
        })
    }


    handleOnchangeName = (event, id) => {

        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleClickSave = () => {
        this.getDataMedicalFacilities()
    }

    render() {
        
      
        return (

            <React.Fragment>
                <div className="medical-facilities__container">
                    <div className="m-s-title">
                            Thêm thông tin cơ sở y tế
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group mt-4">
                                <label htmlFor="">Tên cơ sở y tế</label>
                                <input type='text' className='form-control'
                                value={(this.state.name)}
                                onChange={(event) => this.handleOnchangeName(event, 'name')}
                                />
                            </div>
                            
                            <div className="col-6 form-group mt-4">
                                <label htmlFor="">Địa chỉ cơ sở y tế</label>
                                <input type='text' className='form-control'
                                value={(this.state.address)}
                                onChange={(event) => this.handleOnchangeName(event, 'address')}
                                />
                            </div>

                            <div className="col-6 form-group mt-4">
                                <label htmlFor=""></label>
                                <div className='label-upload'>

                                    <input id="preview-img" type="file"hidden
                                        onChange={(event) => this.handleOnChangeImg(event)}

                                    />
                                    <label htmlFor="preview-img" className='preview-img'>Tải ảnh <i className="fas fa-upload"></i> </label>

                                    <div className="preview-imgg mt-4"
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
                                <button className='mt-4 btn btn-warning'
                                
                                onClick={() => this.handleClickSave()}
                                
                                >Lưu thông tin cơ sở y tế</button>
                            </div>
                        </div>
                    </div>
                       
                   
                </div>
             
    
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageMedicalFacilities);
