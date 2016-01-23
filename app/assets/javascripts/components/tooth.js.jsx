var Tooth = React.createClass({
  render: function(){
    return (
    <div className="tooth">
           Hi, im a tooth, and my name is {this.props.name}
    </div>
    )
  }
})