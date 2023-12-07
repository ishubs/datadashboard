import React, { useState } from 'react';
import axios from 'axios';
import { Select, Card, Button, Tabs } from 'antd';
import { getData } from '../api';
import StudentBarChart from './charts/BarChart';
import DisplayPieChart from './charts/PieChart';
import { set } from 'mongoose';
import DisplayLineChart from './charts/LineChart';
const StudentQueryForm = () => {

    const [students, setStudents] = useState([]); 
    const [queryParams, setQueryParams] = useState({
        gender: '',
        ethnicity: '',
        parentEducation: '',
        lunch: '',
    });

    const options = {
        gender: [
            { value: 'female', label: 'Female' },
            { value: 'male', label: 'Male' },
        ],
        ethnicity: [
            { value: 'group A', label: 'Group A' },
            { value: 'group B', label: 'Group B' },
            { value: 'group C', label: 'Group C' },
            { value: 'group D', label: 'Group D' },
            { value: 'Other', label: 'Other' },
        ],
        parentEducation: [
            { value: 'some college', label: 'Some College' },
            { value: "associate's degree", label: "Associate's Degree" },
            { value: "master's degree", label: "Master's Degree" },
            { value: 'Other', label: 'Other' },
        ],
        lunch: [
            { value: 'standard', label: 'Standard' },
            { value: 'free/reduced', label: 'Free/Reduced' },
        ],
    };

    const charts = [
        {
            label: `Bar Chart`,
            key: 1,
            children: <BarChart data={calculateAverageScores(students)} />,
        },
        {
            label: `Pie Chart`,
            key: 2,
            children: <DisplayPieChart data={calculateAverageScores(students)} />,
        },
        {
            label: `Line Chart`,
            key: 3,
            children: <DisplayLineChart data={students} />,
        }
    ]

    const handleChange = (value, name) => {
        setQueryParams((prevParams) => ({ ...prevParams, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const filledParams = {};
        for (const key in queryParams) {
            if (queryParams[key] !== '') {
                filledParams[key] = queryParams[key];
            }
        }

        const data = await getData(filledParams);
        setStudents(data);
    };

    const s = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "

    return (
        <div>
            <form onSubmit={handleSubmit} class="mx-auto">
                <Card className='flex gap-3 mx-auto justify-around'>
                    {
                        Object.keys(options).map((filter) => {
                            return <Select
                                className='mx-2'
                                placeholder={`Select a ${filter}`}
                                name={filter}
                                style={{ width: 240 }}
                                onChange={(e) => handleChange(e, filter)}
                                options={options[filter]}
                                size='large'
                            />
                        })
                    }
                    <Button size='large' type='submit' onClick={handleSubmit} className='bg-black color-white text-white'>Submit</Button>
                </Card>
            </form>
            <div className='mt-5'>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition={"top"}
                    style={{ height: 220 }}
                    items={charts}
                />
            </div>
        </div>
    );
};

export default StudentQueryForm;



function BarChart({data}) {

    return (
        <div>
            <h1 className='text-2xl text-center my-5'>Score Averages Bar Chart</h1>
           <StudentBarChart data={data} />
        </div>
    )
}


  const calculateAverageScores = (students) => {
    const totalScores = {
      math: 0,
      reading: 0,
      writing: 0,
    };
  
    students.forEach((student) => {
      totalScores.math += student.testScores.math;
      totalScores.reading += student.testScores.reading;
      totalScores.writing += student.testScores.writing;
    });
  
    const numStudents = students.length || 1; 
    const averageScores = {
      math: totalScores.math / numStudents,
      reading: totalScores.reading / numStudents,
      writing: totalScores.writing / numStudents,
    };
    return averageScores;
  };
  