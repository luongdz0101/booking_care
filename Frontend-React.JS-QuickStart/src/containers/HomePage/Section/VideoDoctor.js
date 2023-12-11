import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ForYou.scss';
import '../../gird/gird.scss';

import './VideoDoctor.scss';


class VideoDoctor extends Component {

    render() {
      
      
        return (
            <div className="video-doctor-body bg">
                <div className="video-header">
                    <div className="video-header__text">
                        Truyền thông nói về Booking Care
                    </div>
                </div>
                <div className="video__footer ">
                    <div className="grid ">
                        <div className="video_body">
                            <div className="row">
                                <div className="col l-2">
                                    
                                </div>
                            
                                <div className="col l-4">
                                    <div className="video-content">
                                        <iframe  width="592" height="332" className='video' src="https://www.youtube.com/embed/FyDQljKtWnI" title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </div>
                                </div>
                                <div className="col l-4">
                                  
                                        <div className="row">
                                            <div className="col l-6 logo-video__container mt-2">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 logo-video__container mt-2">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>
                                        </div>
                                               
                                         

                                
                                 
                                </div>
                                <div className="col l-2">
                                
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            
            
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoDoctor);
