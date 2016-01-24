var Main = React.createClass({
  getInitialState: function(){
    return {
      data:null,
      longitude:'',
      latitude:'',
      mapHidden:true
    }
  },
  sendData: function(){
      var formData = {
        location: {
          longitude:this.state.longitude,
          latitude:this.state.latitude
        }
      }
      $.ajax({
        url: "/searches",
        dataType: 'json',
        type: 'POST',
        data: formData,
        success: function(result) {
          console.log(result.data)
         //  this.setState({data:})
        }.bind(this),
        error: function(xhr, status, err) {
          console.error( status, err.toString());
        }.bind(this)
      });
  },
  render: function(){

    return (
    <div>
      <button name="button" onClick={this.setLocation}>Button</button>
      <Map />
    </div>
    )
  },
  setLocation: function(){
      var long=$("#user_long").val()
      var lat=$("#user_lat").val()
      this.setState({longitude:long})
      this.setState({latitude:lat})
  },
  componentDidMount: function(){
    console.log(this.state.data)
  },
  componentDidUpdate: function(){
      if(this.state.data===null) {
       if (this.state.longitude && this.state.latitude) {
            this.sendData();
       }
     }
    console.log(this.state.data)
  }
});
