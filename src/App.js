import React, {useState} from 'react';
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
  switch (kind) {
    case 'number':
      return <div><NumberWidget data={data}/></div>
    case 'timelapse':
      return <TimelapseWidget data={data} />
    default:
      return null
  }
}


function App(props) {
  
  const [selectedWidget, setSelectedWidget] = useState(props.initialData.selectedWidget)

  const widget = props.initialData.widgets.find(widget => widget.id === selectedWidget)

  const widgetList = props.initialData.widgets.map(widget => {
    function handleClick () {
      setSelectedWidget(widget.id)
    }

    return (<Widget key={widget.id} onClick={handleClick}><WidgetFactory data={widget.data} kind={widget.kind}/></Widget>)
  } ) 

  return (
    <div className="App">
      <Wrapper>
        {widgetList}
      </Wrapper>
      {widget &&  <FullScreenWidget><WidgetFactory data={widget.data} kind={widget.kind}/></FullScreenWidget>}
    </div>
  );
}

export default App;
