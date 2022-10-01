import React from 'react'
import { PropTypes } from 'prop-types';
import { store } from './services/store';
import { useSelector } from 'react-redux';

const action = type => store.dispatch({ type });

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) => {
  return <div>
    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Clicked: {value} times
    </div>
  </div>
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter

export const MainCounter = () => {
  const counter = useSelector(state => state.counter);

  return <Counter
    value={counter}
    onIncrement={() => action('INCREMENT')}
    onDecrement={() => action('DECREMENT')}
    onIncrementAsync={() => action('INCREMENT_ASYNC')} />
}
