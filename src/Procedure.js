import React from 'react';
import './Procedure.css';

export default class Procedure extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className='Procedure'>
        Procedure
        <div className='Explanation'>
          We first divide our covid test samples into batches of a certain size, and test each batch on if there are positive covid cases.
          For each group that shows a positive output (at leaset one covid case), we divide these groups into sub-batches of another size, and subsequently test each batch.
          Then we iterate the process once more to obtain more sub-batches with positive covid cases.
          Finally, for these sub-batches, we test each sample to single out the individual cases.
        </div>
      </div>
    )


  }
}
