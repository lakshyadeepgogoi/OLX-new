import React from 'react';
import Cards from './Cards';
import { motion } from 'framer-motion';
import { useState } from 'react';

function AllAds() {
    const [sortBy, setSortBy] = useState('latest');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 max-w-10/12 max-w-full"
        >
            {/* First section: Results Info and Filters */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between items-center mb-5 flex-col md:flex-row"
            >
                {/* Results count */}
                <div>
                    <p className="text-lg font-semibold font-inter">
                        <span className="text-lime-800">574,395</span> Results Found
                    </p>
                </div>
                {/* Filters */}
                <div className="flex gap-3">
                    {/* Sort dropdown */}
                    <select
                        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="price_low_high">Price: Low to High</option>
                        <option value="price_high_low">Price: High to Low</option>
                    </select>
                </div>
            </motion.div>

            {/* Second section: Cards Display */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}

            >
                <Cards sortBy={sortBy} />
            </motion.div>
        </motion.div>
    );
}

export default AllAds;
