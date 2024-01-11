import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ForLife.scss'



class  ForLife extends Component {
    

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            
          };

        return (
           < React.Fragment>
               
                <div className="section-specialty">
                    <div className="grid wide ">
                        <div className="row center">
                            
                            <div className="col-8 header__title--body">
                                    <div className="specialty-header__title">Sống khoẻ suốt đời</div>
                            </div>
                            <div className="col-4 header__button--body">
                                <button type="button" className="btn btn-info specialty-header__button"><FormattedMessage id ="home-page.see-more"/></button>
                            </div>
                        
                        </div>
                    </div>
                    
                </div>
                 <div className="grid wide ">
                 <Slider {...settings}>
                            <div className="specialty-content__body">
                                <div className='specialty-content for-life-content'> 
                                    <div className="specialty-content__img img_for-life"></div>
                                    
                                    <span className='for-life-content__text'>Tổng quan về xét nghiệm HDL cholesterol.....</span>
                                </div>
                            </div>

                           
                            <div className="specialty-content__body">
                                <div className='specialty-content for-life-content'> 
                                    <div className="specialty-content__img img_for-life"></div>
                                    
                                    <span className='for-life-content__text'>Tổng quan về xét nghiệm HDL cholesterol.....</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content for-life-content'> 
                                    <div className="specialty-content__img img_for-life"></div>
                                    
                                    <span className='for-life-content__text'>Tổng quan về xét nghiệm HDL cholesterol.....</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content for-life-content'> 
                                    <div className="specialty-content__img img_for-life"></div>
                                    
                                    <span className='for-life-content__text'>Tổng quan về xét nghiệm HDL cholesterol.....</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content for-life-content'> 
                                    <div className="specialty-content__img img_for-life"></div>
                                    
                                    <span className='for-life-content__text'>Tổng quan về xét nghiệm HDL cholesterol.....</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content for-life-content'> 
                                    <div className="specialty-content__img img_for-life"></div>
                                    
                                    <span className='for-life-content__text'>Tổng quan về xét nghiệm HDL cholesterol.....</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content for-life-content'> 
                                    <div className="specialty-content__img img_for-life"></div>
                                    
                                    <span className='for-life-content__text'>Tổng quan về xét nghiệm HDL cholesterol.....</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content for-life-content'> 
                                    <div className="specialty-content__img img_for-life"></div>
                                    
                                    <span className='for-life-content__text'>Tổng quan về xét nghiệm HDL cholesterol.....</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content for-life-content'> 
                                    <div className="specialty-content__img img_for-life"></div>
                                    
                                    <span className='for-life-content__text'>Tổng quan về xét nghiệm HDL cholesterol.....</span>
                                </div>
                            </div>

                            
                           
                        </Slider>
                 </div>
                       
                    
               
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForLife);
