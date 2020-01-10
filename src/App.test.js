import React from 'react'
import ReactDOM from 'react-dom'
import App, {WidgetFactory, NumberWidget, TimelapseWidget, Widget} from './App'
import TestRenderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App initialData={{ widgets: []}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('WidgetFactory', () => {
  it('should render number widget when kind is number', () => {
    const testInstance = TestRenderer.create(<WidgetFactory data='2' kind='number' />).root
    expect(testInstance.findByType(NumberWidget).type).toEqual(NumberWidget)
  })
  it('should render timelapse widget when kind is Timelapse', () => {
    const testInstance = TestRenderer.create(<WidgetFactory data={[2,3,4]} kind='timelapse' />).root
    expect(testInstance.findByType(TimelapseWidget).type).toEqual(TimelapseWidget)
  })
})

describe('App', () => {
  it('should render a widgetList', () => {
    const initialData = {
      selectedWidget: null,
      widgets: [
        {
          id: '1',
          kind: 'number',
          data: 55,
        },
        {
          id: '2',
          kind: 'timelapse',
          data: [3, 14, 16, 54, 28, 14]
        }
      ]
    }
    const testInstance = TestRenderer.create(<App initialData={initialData} />).root
    expect(testInstance.findAllByType(Widget)).toHaveLength(initialData.widgets.length)
  })
})