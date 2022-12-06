import React,{useEffect, useState} from 'react'
import { Line } from '@ant-design/plots';

function LineChart({data}) {

    const [config, setConfig] = useState({
      data,
      xField: 'Date',
      yField: 'commits',
      label: {},
      point: {
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#5B8FF9',
          lineWidth: 2,
        },
      },
      tooltip: {
        showMarkers: false,
      },
      state: {
        active: {
          style: {
            shadowBlur: 4,
            stroke: '#000',
            fill: 'red',
          },
        },
      },
      interactions: [
        {
          type: 'marker-active',
        },
      ],
    });

    useEffect(() => {
      if(data.length > 0){
        setConfig({
            ...config,
            data
        })
      }
    }, [data]);

  
    return (
        <Line {...config} />
    )
}

export default LineChart