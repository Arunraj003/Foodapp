import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>  Welcome to FoodApp, your ultimate destination for discovering delicious meals from your favorite restaurants. Browse our extensive menu, customize your orders, and enjoy exclusive deals. Join our community today and indulge in a culinary journey like no other. Follow us on social media for the latest updates and special offers.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 9361995841</li>
                        <li>Contact: arunr6506@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />

            <p className="footer-copyright">Copyright 2024 &copy; Tomato.com - All Rights Reserved.</p>
        </div>
    )
}

export default Footer