import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AnsweredDoctor.scss";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
class AnsweredDoctor extends Component {




    handleDetailerAsKAnswer = () => {
        
        this.props.history.push(`/doctor_ask-answer`)
    }

    render() {
        
    
        return (
            < React.Fragment>
                <div className="section-specialty" onClick={() => this.handleDetailerAsKAnswer()}>
                    <div className="specialty-content ">
                    <div className="grid wide ">
                        <div className="row">
                            
                            <div className="col-8 header__title--body">
                                    <div className="specialty-header__title">Bác sĩ hỏi đáp</div>
                            </div>
                            <div className="col-4 header__button--body">
                                <button type="button" className="btn btn-info specialty-header__button"><FormattedMessage id ="home-page.see-more"/></button>
                            </div>

                            <div className="col-4 mt-4">
                                <div className="specialty-content__body">
                                    <div className='specialty-content'> 
                                        <div className="specialty-content__img img_answered"></div>
                                        
                                        <span className='specialty-content__text answered-text'>Cảm nang hỏi đáp</span>
                                    </div>
                                </div>
                            </div>

                        
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnsweredDoctor));

