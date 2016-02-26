console.log('hello');

var ProductTable = React.createClass({ //PARENT

  getInitialState: function() {  //products will be used as our 'state'.  therefore, we need to initialize it.
    return {products: []}
  },
  propTypes: {
    url: React.PropTypes.string.isRequired,
  },
  loadProductsFromServer: function() {
    console.log('I am being triggered')
    var self = this;  // because you are declaring this variable outside of the ajax scope, you are tying it to the ProductTable scope
    $.ajax({
      url: this.props.url,
      method: 'GET'
    }).done(function(data){  //when data comes back from server, then do:
      console.log(data);
      self.setState({products: data});  // products property now has a value => data
    })
  },
  componentDidMount: function() {  // when mounted to the page, then call the function that will load all the data
    this.loadProductsFromServer();
  },
  render: function() { // this is where I render the ProductList
    return (
      <div>
        <ProductList products={this.state.products} />
      </div>
      )
  }
});
  

var  ProductList = React.createClass({ //CHILD
  render: function() {
    var inStock = function(p) {
      return p.inStock;
    };
    var productInStock = this.props.products.filter(inStock).map(function(t) {  // this.props always tells me to look at the parent component of the component you are in
      return (
          <tr>
            <td> { t.name } </td>
            <td> { t.cost } </td>
            <td> { t.inStock.toString() } </td>
          </tr>
        )
      // t.inStock.toString() = because inStock is a value type, it needs to be converted .toString() for it to display
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
// url = api (from server.js,) products (from products.js)


