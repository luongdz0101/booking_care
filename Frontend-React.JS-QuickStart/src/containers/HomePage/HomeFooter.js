import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HomeFooter.scss';
import '../gird/gird.scss';




class HomeFooter extends Component {

    render() {
      
      
        return (
            < React.Fragment>
                <div className="footer-container">
                    <div className="grid wide">
                        <div className="footer-content">
                            <div className="row">
                                <div className="col l-6  c-12">
                                    <div className="footer-content__left">
                                        <div className="content__left-img"></div>
                                        <div className="content__left-header">
                                            <div className="img-map"></div>
                                            <div className="text-map">Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</div>
                                        </div>
                                            <div className="content__left-address">
                                        <div className="img-check"></div>
                                            <div className="text-map">ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</div>
                                        </div>
                                        <div className="content__left-dk"></div>
                                    </div>
                                </div>
                             
                                <div className="col l-6  c-12">
                                    <div className="footer-content-right">
                                        <div className="content-right__header-body">
                                            Đối tác bảo trợ nội dung
                                        </div>
                                        <div className="content-right__header">
                                            Hello Doctor
                                        </div>
                                        <div className="content-right__footer">
                                            Bảo trợ chuyên mục nội dung “sức khỏe tinh thần”
                                        </div>

                                        <div className="content-right__header">
                                            Hệ thống y khoa chuyên sâu quốc tế Bernard
                                        </div>
                                        <div className="content-right__footer">
                                            Bảo trợ chuyên mục nội dung “y khoa chuyên sâu”
                                        </div>

                                    </div>
                               </div>
                            </div>  
                            
                        </div>
                    </div>
                </div>
                <div className="footer-end">
                     <div className="grid wide">
                        <div className="footer-end-content">
                            <div className="row footer-center">
                                <div className="col l-6 c-12 m-6">
                                     <div className="text-footer-end">Copy booking care by @2023</div>
                                </div>
        
                                <div className="col l-4 c-0 m-6">
                                    <div className="logo_footer">
                                        <div className="img-facebook"></div>
                                        <div className="img-youtube"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
