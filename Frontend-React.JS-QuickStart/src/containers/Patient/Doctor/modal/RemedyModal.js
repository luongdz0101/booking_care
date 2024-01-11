import React, { Component } from 'react';
import { connect } from "react-redux";
import { CommonUtils } from '../../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class RemedyModal extends Component {
   
        
    constructor(props){
        super(props);
        this.state = {
           email : '',
           imageBase64: ''
        }
    }
  


    async componentDidMount(){
        
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if( this.props.dataModal !== prevProps.dataModal ){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
  

    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            
            this.setState({
              
                imageBase64: base64
            })
        }
        
        
    }

    handleSendRemedy = () => {
       this.props.sendRemedy(this.state)
    }


    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.email
        })
    }
    render() {

        let {isOpenModal, closeModal, dataModal} = this.props

        return (

            <React.Fragment>
               
               <Modal isOpen={isOpenModal} 
               
              
               size='md'
              
               >
                <ModalHeader toggle={closeModal}>Gửi Hoá đơn khám bệnh thành công</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                           
                                <label htmlFor="">Email bệnh nhân</label>
                                <input className='form-control' type="email" value={this.state.email} 
                                
                                onChange={(event) => {
                                    this.handleOnchangeEmail(event)
                                }}  
                                
                                />
                            
                        </div>

                        <div className="col-6 form-group">
                           
                                <label htmlFor="">Chọn file kệt quả khám</label>
                                <input  type="file"  
                                
                                onChange={(event) => this.handleOnChangeImg(event)}
                                />
                            
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        Gửi
                    </Button>{' '}
                    <Button color="secondary" onClick={closeModal}>
                     
                        Hủy bỏ
                    </Button>
                </ModalFooter>
                 
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
