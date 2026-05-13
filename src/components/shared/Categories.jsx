import React from 'react';

const Categories = () => {
   const categories = [
        { name: 'Tech & Programming', count: '120+', bg: 'bg-blue-50' },
        { name: 'Story & Novels', count: '450+', bg: 'bg-orange-50' },
        { name: 'Business & Career', count: '80+', bg: 'bg-purple-50' },
        { name: 'Academic & Science', count: '200+', bg: 'bg-emerald-50' },
    ];

    return (
        <section className="py-10 max-w-7xl mx-auto px-4 pt-1">
            <h2 className="text-3xl font-bold text-center text-emerald-900 mb-10">Explore by Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <div key={cat.name} className={`${cat.bg} p-8 rounded-3xl text-center hover:shadow-lg transition-all cursor-pointer group border border-transparent hover:border-emerald-200`}>
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-emerald-700">{cat.name}</h3>
                        <p className="text-emerald-600 mt-2 font-medium">{cat.count} Books</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;