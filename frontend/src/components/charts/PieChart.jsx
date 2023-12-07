import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const DisplayPieChart = ({ data }) => {
  const chartData = Object.keys(data).map((subject) => ({
    subject,
    value: data[subject],
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658']; // Add more colors if needed

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Tooltip />
        <Legend />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="subject"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DisplayPieChart;
