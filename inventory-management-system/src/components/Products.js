import React, { Component } from 'react';
import ProductInput from './Inputproduct';

var products = [
    {
        productsTitle: 'My first product',
        productsResponsible: 'Flintoff Baloch',
        productsDescription: 'My first products description',
        productsPriority: 'low'
    },
    {
        productsTitle: 'My Second product',
        productsResponsible: 'Wayn Baloch',
        productsDescription: 'My first products description',
        productsPriority: 'low'
    },
    {
        productsTitle: 'My Third product',
        productsResponsible: 'Ronaldo Baloch',
        productsDescription: 'My first products description',
        productsPriority: 'low'
    }
];


class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products
        };

    this.handleAddProducts = this.handleAddProducts.bind(this);
    
    }

    handleRemoveProduct(index) {
        const products = this.state.products;
        this.setState({
            products: products.filter(function (e, i) {
                return i !== index;
            })
        })
    }

    handleAddProducts(product) {
        console.log(product);
        this.setState({products:[...this.state.products, product]},
        ()=> console.log(this.state.products))
    }

    render() {
        return (
            <div className="container">
                <ProductInput onAddProduct={this.handleAddProducts} />
                <hr />
                <h4>Products Count: <span className="badge badge-default">{this.state.products.length}</span></h4>
                <ul className="list-group">
                    {this.state.products.map((product, index) =>
                        <li className="list-group-item" key={index}>
                            <h4 className="list-group-item-heading">{product.productsTitle} <small><span className="label label-info">{product.productsPriority}</span></small></h4>
                            <p><span className="glyphicon glyphicon-user"></span> {product.productsResponsible}</p>
                            <p>{product.productsDescription}</p>
                            <button className="btn btn-danger btn-sm" onClick={this.handleRemoveProduct.bind(this, index)}><span className="glyphicon glyphicon-trash"></span> Delete</button>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Products;