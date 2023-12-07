import React from 'react';
import Form from '../components/Form';
import { Button } from 'antd';
const Dashboard = () => {
    return (
        <div>
            <h1 className='text-4xl text-center mb-5 font-bold'>Data Analysis Dashboard</h1>
            {/* Add your dashboard content here */}
            <Button  className='mb-5 absolute top-5 right-5'
            onClick={()=>{
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('token')
                window.location.href = '/'
            }}
            >logout</Button>
            <Form></Form>
        </div>
    );
};

export default Dashboard;
