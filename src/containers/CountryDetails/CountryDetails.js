import React from "react";

import axios from "../../axios";
import Card from "../../UI/Card/Card";
import Loader from "../../UI/Loader/Loader";

class CountryDetails extends React.Component {
  state = { countryCode: "", countryDetails: null, loading: true };

  componentDidMount() {
    const countryCode = this.props.location.pathname.split("/")[2];
    this.setState({
      countryCode: countryCode,
    });

    this.getCountryDetails(countryCode);
  }

  componentDidUpdate() {
    const countryCode = this.props.location.pathname.split("/")[2];

    if (countryCode !== this.state.countryCode) {
      this.setState({
        countryCode: countryCode,
      });

      this.getCountryDetails(countryCode);
    }
  }

  onBorderCountryClickHandler = (code) => {
    this.props.history.push(`/countries/${code}`);
  };

  getCountryDetails = (countryCode) => {
    this.setState({
      loading: true,
    });

    axios
      .get(`/alpha/${countryCode}`)
      .then((res) => {
        this.setState({
          countryDetails: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return this.state.loading ? (
      <Loader></Loader>
    ) : (
      <Card
        countryDetails={this.state.countryDetails}
        onBorderCountryClickHandler={this.onBorderCountryClickHandler}
      ></Card>
    );
  }
}

export default CountryDetails;
