import React from 'react'

const Home: React.FC = () => {
    return (
        <>  <h1 className="text-2xl text-center font-bold">Welcome to Task App</h1>
            <p className="text-gray-600 text-center mt-2">Manage your tasks efficiently with our easy-to-use dashboard.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {/* Step 1 */}

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">1. Create a Task</h3>
                    <p className="text-gray-600 mt-2">Click on 'Tasks' and add a new task with details.</p>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">2. Update Progress</h3>
                    <p className="text-gray-600 mt-2">Mark tasks as completed or in progress.</p>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">3. Track Performance</h3>
                    <p className="text-gray-600 mt-2">Monitor your productivity with visual insights.</p>
                </div>
            </div>
        </>

    )
}

export default Home
