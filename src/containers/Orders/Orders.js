import React from 'react';
import Order from '../../components/Order/Order';

class Orders extends React.Component {
  state = {  }
  
  render() {
    return (
      
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;