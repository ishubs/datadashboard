import React, {useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ColorPicker, InputNumber } from 'antd';
const DisplayBarChart = ({ data }) => {

    const [color, setColor] = useState('#000000');
    const [height, setHeight] = useState(400);
  const chartData = Object.keys(data).map((subject) => ({
    subject,
    score: data[subject],
  }));

    const handleColorChange = (color, hex) => {
        setColor(hex)
    }


  return (
    <div className=''>
    <h1 className='text-2xl text-center'>Bar Chart</h1>
    <p className='mb-4'>Select the chart of color and size</p>
    <div className='flex gap-4'>
    <ColorPicker className='mb-5' value={color} onChange={handleColorChange} size="large" showText />
    <InputNumber className='mb-5' min={100} max={1000} defaultValue={400} onChange={setHeight} />
    </div>
    <ResponsiveContainer width="100%" height={height}>
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="subject" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="score" fill={color} />
    </BarChart>
  </ResponsiveContainer>
  </div>
  );
};

export default DisplayBarChart;
