import React, {useState, useEffect, memo} from 'react';
import styled from 'styled-components'

export const Widget = styled.li`
background: #e2dfdd;
margin: 10px;
width: 25vw;
height: 25vh;
list-style: none;
border-radius: 8px;
border: 2px solid #a4a3a3;
`
const FullScreenWidget = styled.div`
background: #e2dfdd;
margin: 60px;
list-style: none;
border-radius: 8px;
border: 2px solid #a4a3a3;
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
display: flex;
align-items: center;
justify-content: center;
`

const Wrapper = styled.ul`
  display: flex;
`

export const TimelapseWidget = (props) => {
  if(!props.data) return 'no data'

  return props.data.map((number, index) => {
    return (<div key={index}>{number}</div>)
  }) 
}

export const NumberWidget = (props) => {
  if(!props.data) return 'no data'

  return (JSON.stringify(props.data))  
}


export const WidgetFactory = ({data, kind}) => {
  console.count(`widget ${kind}`)
  switch (kind) {
    case 'number':
      return <div><NumberWidget data={data}/></div>
    case 'timelapse':
      return <TimelapseWidget data={data} />
    default:
      return null
  }
}

const MemoizedWidgetFactory = memo(WidgetFactory)

function App() {
  
  const [widgetsData, setWidgetsData] = useState(
    {
      '1': {
        id: '1',
        kind: 'number',
        data: 55,
      },
      '2': {
        id: '2',
        kind: 'timelapse',
        data: []
      }
    }
  )
  const [selectedWidget, setSelectedWidget] = useState(null)
    useEffect(() => {
      const client = new WebSocket('ws://localhost:8080')
      client.onmessage = (message) => {
        const messageData = JSON.parse(message.data)
        console.log({messageData, widgetsData})
        switch (messageData.kind) {
          case 'number':
            setWidgetsData((prevData) => ({
              ...prevData,
              '1': {
                ...prevData['1'],
                data: messageData.value
              }
            }))
            break
          case 'timelapse':
            setWidgetsData((prevData) => ({
              ...prevData,
              '2': {
                ...prevData['2'],
                data: [...prevData['2'].data, messageData.value]
              }
            }))
            break
          default:
            break;
        } 
         
      }
    }, [])
  

  const widget = widgetsData[selectedWidget]


  const widgetList = Object.values(widgetsData).map(widget => {
    function handleClick () {
      setSelectedWidget(widget.id)
    }

    return (<Widget key={widget.id} onClick={handleClick}><MemoizedWidgetFactory data={widget.data} kind={widget.kind}/></Widget>)
  } ) 

  return (
    <div className="App">
      <Wrapper>
        {widgetList}
      </Wrapper>
      {widget &&  <FullScreenWidget><MemoizedWidgetFactory data={widget.data} kind={widget.kind}/></FullScreenWidget>}
    </div>
  );
}

export default App;
