var Main = React.createClass({
  getInitialState: function(){
    return {
      data:null,
      longitude:'',
      latitude:''
    }
  },
  sendData: function(){
       var formData = {
         location: {
           longitude:this.state.longitude,
           latitude:this.state.latitude
         }
       }

       console.log(formData)
      //    $.ajax({
      //    url: "/searches",
      //    dataType: 'json',
      //    type: 'POST',
      //    data: formData,
      //    success: function(data) {
      //      console.log(data)
      //    }.bind(this),
      //    error: function(xhr, status, err) {
      //      console.error( status, err.toString());
      //    }.bind(this)
      //  });
  //  },
  },
  render: function(){
    return (
    <div>
      <button name="button" onClick={this.setLocation}>Button</button>
    </div>
    )
  },
  setLocation: function(){
      var long=$("#user_long").val()
      var lat=$("#user_lat").val()
      this.setState({longitude:long})
      this.setState({latitude:lat})
  },
  componentDidUpdate: function(){
    if (this.state.longitude && this.state.latitude) {
      this.sendData();
    }
  }
});
