console.log('hello');

var ProductTable = React.createClass({

  getInitialState: function() {
    return {data: []}
  },
  propTypes: {
    url: React.PropTypes.string.isRequired,
  },
  loadProductsFromServer: function() {
    console.log('I am being triggered')
    var self = this;
    $.ajax({
      url: this.props.url,
      method: 'GET'
    }).done(function(data){
      console.log(data);
      self.setState({data: data});
    })
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
  },
  render: function() {
    return (
      <div>
        <ProductList products={this.state.data} />
      </div>
      )
  }
});
  

var  ProductList = React.createClass({
  render: function() {
    var inStock = function(p) {
      return p.inStock;
    };
    var productInStock = this.props.products.filter(inStock).map(function(t) {
      return (
          <tr>
            <td> { t.name } </td>
            <td> { t.cost } </td>
            <td> { t.inStock.toString() } </td>
          </tr>
        )
      })

  return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>product</th>
                <th> cost </th>
                <th> inStock </th>
              </tr>
            </thead>
            <tbody>
              { productInStock }
            </tbody>
          </table>
        </div>
      )
  }
});

React.render(<ProductTable url="api/products" />, document.getElementById('react-container'));


