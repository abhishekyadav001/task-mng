import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-2xl text-gray-600 mb-6">Page Not Found</p>
                <p className="text-gray-500">
                    The page you are looking for does not exist or has been moved.
                </p>
                <a
                    href="/" // Or your preferred "Go Home" link
                    className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;