import React, {Component} from 'react';

class ProductInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            productsTitle: "",
            productsResponsible: "",
            productsDescricption: "",
            productsPriority: "Lowest"
        }
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.props.onAddProduct(this.state);
        this.setState({
            productsTitle: "",
            productsResponsible: "",
            productsDescription: "",
            productsPriority: "Lowest"
        });
    }

    render() {
        return (
            <div>
                <h4>Add New Product</h4>
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="inputProductTitle" className="col-sm-2 control-label">Title</label>
                        <div className="col-sm-10">
                            <input name="productsTitle" type="text" className="form-control" onChange={this.handleInputChange.bind(this)} value={this.state.productsTitle} id="inputProductTitle" placeholder="Title" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputProductResponsible" className="col-sm-2 control-label">Responsible</label>
                        <div className="col-sm-10">
                            <input name="productsResponsible" type="text" className="form-control" onChange={this.handleInputChange.bind(this)} value={this.state.productsResponsible} id="inputProductResponsible" placeholder="Responsible" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputProductDescription" className="col-sm-2 control-label">Description</label>
                        <div className="col-sm-10">
                            <textarea name="productsDescription" className="form-control" rows="3" onChange={this.handleInputChange.bind(this)} value={this.state.productsDescription} id="inputDescription"></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputProductPriority" className="col-sm-2 control-label">Priority</label>
                        <div className="col-sm-10">
                            <select name="productsPriority" className="form-control" onChange={this.handleInputChange.bind(this)} value={this.state.productsPriority} id="inputPriority">
                                <option>Lowest</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Highest</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-success" type="submit">Add Product</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default ProductInput;