import React, { useState } from 'react';

function CategoryCard({ iconSrc, title, ads, onClick }) {
    const [hover, setHover] = useState(false);

    return (
        <div className="category-card flex flex-col items-center justify-center bg-white rounded-lg transition duration-300 ease-in-out transform hover:shadow-lg p-6 cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}>
            <div className={`rounded-full bg-[#E8F7FF] ${hover ? 'bg-green-500 shadow-lg shadow-gray-600' : ''} p-4`}>
            <img src={iconSrc} alt="Category Icon" className="w-12 h-12" />
            </div>
            <p className="mt-4 text-center text-lg font-medium text-gray-800">{title}</p>
            {hover ? <span className="text-center text-green-600">View Ads →</span> : <p className="text-center text-gray-600">{ads} Ads</p>}
        </div>
    );
}

export default CategoryCard;
