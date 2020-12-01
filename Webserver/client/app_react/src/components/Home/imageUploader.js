import React from 'react';
import ReactDOM from 'react-dom';

export default class PictureUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: false,
      src: false
    }
  }


  render() {
    return (
      <div>
        <h5>Picture Uploader</h5>

        <input
          type="file"
        />
        <br/>
        <div>
          <p>
            No Preview
          </p>
        </div>
        <hr/>
        <button>
          Upload
        </button>
      </div>
    );
  }
}
//ReactDom.render(<PictureUploader/>, document.getElementById('root'));