import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './HeaderClinic.scss';
import ProfileClinic from '../MedicalFacilities/profileClinic';
import { getAllMedicalFacilities } from '../../../services/userServices';
import { withRouter } from 'react-router';


class HeaderClinic extends Component {

        
    constructor(props){
        super(props);
        this.state = {
            arrClinic: []
           
        }
    }
  

    async componentDidMount(){

        let res = await getAllMedicalFacilities();

        
        if(res && res.errCode == 0){
            this.setState({
                arrClinic: res.data
            })
        }

     
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      
    }
  
    handleViewDetailClinic = (clinic) => {
       
        this.props.history.push(`/detail-clinic/${clinic.id}`)

    }



    render() {
        
        let {arrClinic} = this.state
     
      
        return (

            <React.Fragment>
                <HomeHeader />
               <div className="clinic-link-container mt">
                    <div className="container">

          
                    <div className="row">
                        <div className="col-12">
                            <div className="clinic-link-text">Cơ sở y tế....</div>
                        </div>
                    </div>
                    </div>
                   
                        <div className="container">
                           


                            {arrClinic && arrClinic.length > 0 &&
                            
                            arrClinic.map((item, index) => {
                                return (
                                
                                       
                                <div className="row mt mt-child"
                                
                                    onClick={() => this.handleViewDetailClinic(item)}
                                >
                                        
                                            <div className="col-2">

                                            
                                                <div className="header-clinic__img"

                                                style={{backgroundImage: `url(${item.image})`}}
                                                
                                                >

                                                </div>
                                    
                                            
                                            </div>

                                            <div className="col-10">
                                                    <div className="detail-clinic__body-text">
                                                
                                                    <div className="detail-clinic__text-up">
                                                        {item.name}
                                                    </div>
                                                

                                        
                                                    <div className="detail-clinic__dow">
                                                        {item.address}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderClinic));
