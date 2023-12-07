import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const SimpleRadialBarChartExample = ({data}) => {
  const radialBarChartData = convertToRadialBarChartData(data);

    return (
        <div>
        <h1 className='text-2xl text-center'>Radial Bar Chart</h1>
        <h2 className='text-center'>Average scores of various groups</h2>
        <h6 className='text-center'>Do not select the group in above form to view this chart</h6>
      <RadialBarChart width={400} height={400} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} className='mx-auto' data={radialBarChartData}>
        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background dataKey="averageScore" />
        <Tooltip />
      </RadialBarChart>
      </div>
    );
  };
  
  export default SimpleRadialBarChartExample;
  


  function convertToRadialBarChartData(originalData) {
    const groupedData = {};
  
    // Group data by 'group' property
    originalData.forEach((item) => {
      const groupName = item.ethnicity;
      if (!groupedData[groupName]) {
        groupedData[groupName] = { totalScore: 0, count: 0 };
      }
  
      // Accumulate scores for each group
      groupedData[groupName].totalScore += item.testScores.math + item.testScores.reading + item.testScores.writing;
      groupedData[groupName].count += 1;
    });
  
    // Calculate average scores and format the data
    const convertedData = Object.keys(groupedData).map((groupName) => ({
      group: groupName,
      averageScore: groupedData[groupName].totalScore / groupedData[groupName].count,
    }));
  
    return convertedData;
  }
  
