import React, {Component} from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const WithData = (View, getData) => {
    return class extends Component {
        state = {
            data: null,
            loading: true,
            error: false
        };

        componentDidMount() {
            getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false,
                        error: false
                    });
                })
                .catch(() => {
                    this.setState({
                        loading: false,
                        error: true
                    })
                });
        }

        render() {
            const { data, loading, error } = this.state;

            if (loading) {
                return <Spinner />;
            }

            if (error) {
                return <ErrorIndicator />;
            }

            return (
                <View {...this.props} data={data} />
            );
        }
    }
}

export default WithData;
