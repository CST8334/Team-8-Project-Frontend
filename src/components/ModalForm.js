import React from 'react';
import axios from "axios";

class ModalForm extends React.Component {
    date = new Date();
    constructor(props) {
        super(props)
        this.state = {
            brand: '',
            product: '',
            price: '',
            platform: 'Youtube',
            deadline: '',
            details: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleChangeNumber = (e) => {
        // seperate behaviour for handling number fields, cleanest implementation is a seperate function
        const val = e.target.value;
        // If the current value passes the validity test then apply that to state
        if (e.target.validity.valid) this.setState({ price: e.target.value });

    }


    handleSubmit(event) {
        alert('An Ad Request was submitted for Dreamwell approval \nBrand: ' + this.state.brand
            + '\nProduct: ' + this.state.product
            + '\nPrice: $' + this.state.price
            + '\nPlatform: ' + this.state.platform
            + '\nDeadline: ' + this.state.deadline);
        axios.post('http://localhost:8000/new-brand-card/',
          
              
            {

                "creator_campaign": null,

                "brand_campaign": 1,

                "state": "active",

                "price": this.state.price,

                "platform": this.state.platform,

                "execution_deadline": this.state.deadline,

                "dreamwell_approval_time": null,

                "dreamwell_rejection_time": null,

                "completion_time": null,

                "brand_user": 2,

                "creator_user": null,

                "brand_organization": 1,

                "description": this.state.brand + " wants to place an ad for their " + this.state.product + " product, and has provided the following details: " + this.state.details

            }, {
            headers: {

                //'Access-Control-Allow-Origin': 'http://localhost:3000/dealbuilder',

                'Authorization': `Token 06a50127dc96df513bfff7c9a978dfe53b3b96b1`
            }
        }
        );
        event.preventDefault();
    }



    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="brand">Brand Name
                    </label>
                    <input className="form-control" name="brand"
                        value={this.state.brand} onChange={this.handleChange} required={true} />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="product">Product Name
                    </label>
                    <input className="form-control" name="product"
                        value={this.state.product} onChange={this.handleChange} required={true} />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="price">Desired Price </label>
                    <input type="number" className="form-control" name="price" required={true}
                        value={this.state.price} onChange={this.handleChangeNumber} />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="platform">Chosen Platform
                        <select name="platform"
                            value={this.state.platform}
                            onChange={this.handleChange}
                            required={true}>
                            <option value="Youtube">Youtube</option>
                            <option value="Instagram">Instagram</option>
                        </select>
                    </label>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="deadline">Deadline
                    </label>
                    <input type="date"
                        name="deadline"
                        value={this.state.deadline}
                        onChange={this.handleChange}
                        min={this.date.toISOString().substring(0, 10)}
                        required={true}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="details">Additional Info: </label>
                </div>
                <div>
                    <textarea value={this.state.details} name="details" onChange={this.handleChange} />
                </div>
                <br />
                <div className="form-group">
                    <button className="form-control btn btn-primary" type="submit">
                        Submit
    </button></div>
            </form>
        );
    }
}
export default ModalForm;