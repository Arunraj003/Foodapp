import React from 'react';
import { menu_list } from '../../assets/assets';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>
                Explore and Dive in our menu featuring Delicious Dishes. Our mission is to give food to all people with Affordable Prices.
            </p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                        className='explore-menu-list-item'
                    >
                        <img
                            className={category === item.menu_name ? "active" : " "}
                            src={item.menu_image}
                            alt="menu-image"
                        />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
