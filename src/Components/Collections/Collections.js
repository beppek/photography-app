import React, { Component } from 'react';

import DBService from "../../Firebase/DBService";

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            images: []
        }
        this.dbService = new DBService();
    }

    render() {
        console.log(this.props.images);
        return (
            <div className="Collections">
                <h1>Collections</h1>
            </div>
            );
    }
}

export default Collections;