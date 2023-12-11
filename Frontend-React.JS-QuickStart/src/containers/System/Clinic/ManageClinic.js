import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import './ManageClinic.scss';
import {  CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import 'react-markdown-editor-lite/lib/index.css';
import { getMedicalFacilitiesById, getAllMedicalFacilities, saveInfoMedicalFacilities,deleteMedicalFacilities } from '../../../services/userServices';
import { CRUD_ACTIONS } from '../../../utils/constant';

import { toast } from 'react-toastify';
const mdParser = new MarkdownIt();




class ManageClinic extends Component {


  
        
    constructor(props){
        super(props);
        this.state = {
           
            arrClinic: [],
            descriptionHtml: '',
            descriptionMarkdown: '',
            address: '',
            name: '',
            image: '',
            hasOldData: false,
          
        }
    }
  
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHtml: html,
        })
    }

    async componentDidMount(){
        await this.getAllMedicalFacilities();
    }


    getAllMedicalFacilities = async() => {
        let res = await getAllMedicalFacilities ();

        let data = res.data;

        let arrClinic = this.buildDataInputSelect(data);
        if(res && res.errCode === 0){
            this.setState({
                arrClinic : arrClinic
            })
        }
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

    componentDidUpdate(prevProps, prevState, snapshot){
      
    }
 
    buildDataInputSelect = (inputData) => {
        let result = [];

        
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name
                    object.value = item.id;
                    result.push(object)
            })
           
        }

        return result;
    }
  
    handleChange = async(selectedOption) => {
       
        let {hasOldData} = this.state;
        this.setState({ selectedOption });
         let res = await getMedicalFacilitiesById({
            id: selectedOption.value
         });


         if(res && res.errCode === 0 ){
            

            let descriptionHtml = '';
            let descriptionMarkdown = '';
            let  address = '';
            let name = '';
            let imageBase64 = '';
            let previewImgURL = '';
        

            if(res.data) {
                descriptionHtml = res.data.descriptionHtml;
                descriptionMarkdown = res.data.descriptionMarkdown;
                address = res.data.address;
                name = res.data.name;
                previewImgURL = imageBase64;
                imageBase64 =  res.data.image;
            }


            this.setState({
                descriptionHtml : descriptionHtml,
                descriptionMarkdown: descriptionMarkdown,
                address: address,
                name: name,
                previewImgURL: imageBase64,
                imageBase64: imageBase64,
                hasOldData: true

            })
         }else{
            this.setState({
                descriptionHtml : '',
                descriptionMarkdown: '',
                address: '',
                name: '',
                previewImgURL: '',
                imageBase64: '',
                hasOldData: false
            })
         }
    };

    

     handleClickSave =  async() => {
        let {hasOldData} = this.state;

      
        
        let res = await saveInfoMedicalFacilities({
            descriptionHtml: this.state.descriptionHtml,
            descriptionMarkdown: this.state.descriptionMarkdown,
            address: this.state.address,
            clinicId: this.state.selectedOption.value,
            name: this.state.name,
            image: this.state.imageBase64,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
       
            
        })

        if(res && res.errCode === 0){
            toast.success('Lưu thông tin cơ sở y tế thành công');
            this.setState({
                descriptionHtml: '',
                descriptionMarkdown: '',
                address: '',
                name: '',
                previewImgURL: '',
                selectedOption: '',
                image: '',
                imageBase64:  '',

            })
        }else{
            toast.error('Lưu thông tin cơ sở y tế thất bai')
        }
    }

    handleClickDeleted = async() => {
        
        let res = await deleteMedicalFacilities({
            id: this.state.selectedOption.value
        });
        if(res && res.errCode === 0){
            await this.getAllMedicalFacilities();
            toast.success('Xoá thông tin cơ sở y tế thành công');

            this.setState({
                descriptionHtml: '',
                descriptionMarkdown: '',
                address: '',
                name: '',
                previewImgURL: '',
                selectedOption: '',
                image: '',
                imageBase64:  '',

            })
        }else{
            toast.error('Xoá tin cơ sở y tế thất bại')
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
    render() {
        
    
        
      
        return (

            <React.Fragment>
                <div className="medical-facilities__container">
                    <div className="m-s-title">
                            Quản lý cơ sở y tế
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group mt-4">
                                <label htmlFor="">Tên cơ sở y tế</label>
                                <Select
                                    
                                    onChange={this.handleChange}
                                    value={this.state.selectedOption}
                                    options={this.state.arrClinic}
                                    placeholder = {'Chọn phòng khám'}
                                    
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
                                 <button className='mt-4 ml-4 btn btn-danger'
                                
                                onClick={() => this.handleClickDeleted()}
                                
                                >Xoá cơ sở y tế</button>  
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
