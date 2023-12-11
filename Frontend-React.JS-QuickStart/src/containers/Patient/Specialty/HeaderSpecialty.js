import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './HeaderSpecialty.scss';
import ProfileClinic from '../MedicalFacilities/profileClinic';
import { getAllSpecialty } from '../../../services/userServices';
import { withRouter } from 'react-router';


class HeaderSpecialty extends Component {

        
    constructor(props){
        super(props);
        this.state = {
            arrSpecialty: []
           
        }
    }
  

    async componentDidMount(){

        let res = await getAllSpecialty();

        
        if(res && res.errCode == 0){
            this.setState({
                arrSpecialty: res.data
            })
        }

     
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      
    }
  
    handleViewDetailSpecialty = (specialty) => {
       
        this.props.history.push(`/detail-specialty/${specialty.id}`)

    }



    render() {
        
        let {arrSpecialty} = this.state
     
      
        return (

            <React.Fragment>
                <HomeHeader />
               <div className="clinic-link-container mt">
                    <div className="container">

          
                    <div className="row">
                        <div className="col-12">
                            <div className="clinic-link-text">Khám Chuyên khoa....</div>
                        </div>
                    </div>
                    </div>
                   
                        <div className="container">
                           


                            {arrSpecialty && arrSpecialty.length > 0 &&
                            
                            arrSpecialty.map((item, index) => {
                                return (
                                
                                       
                                <div className="row mt mt-child"
                                
                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                >
                                        
                                            <div className="col-2">

                                            
                                                <div className="detail-clinic__img"

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSpecialty));
