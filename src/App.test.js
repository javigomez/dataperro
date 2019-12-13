import React from 'react'
import ReactDOM from 'react-dom'
import App, {WidgetFactory, NumberWidget} from './App'
import TestRenderer from 'react-test-renderer'
import expectExport from 'expect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App initialData={{ widgets: []}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('WidgetFactory', () => {
  it('should render number widget when kind is number', () => {
    const testInstance = TestRenderer.create(<WidgetFactory data='2' kind='number' />).root
    //expect(testInstance).toMatchSnapshot()
    expect(testInstance.findByType(NumberWidget)).toBe(true)
  })
})
