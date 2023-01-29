import React, { Component } from 'react';
import * as PropTypes from "prop-types";
import Spinner from "../spinner";

import './item-details.css';

export const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export default class ItemDetails extends Component {
    static propTypes = {
        itemId: PropTypes.string,
        getData: PropTypes.func.isRequired,
        getImageUrl: PropTypes.func.isRequired
    };

    state = {
        item: null,
        image: null,
        loading: false
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl
        ) {
            this.setState({
                loading: true
            });
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item),
                    loading: false
                });
            });
    }

    render() {
        const { item, image, loading } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const error = !(item || loading) ? <span>Select a item from a list</span> : null;
        const content = item && !loading ?
            <React.Fragment>
                <img className="item-image"
                     src={image} />

                <div className="card-body">
                    <h4>{item.name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item});
                            })
                        }
                    </ul>
                </div>
            </React.Fragment> : null;

        return (
            <div className="item-details card">
                {error}
                {spinner}
                {content}
            </div>
        )
    }
}
