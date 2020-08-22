import React from 'react';
import './Location.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ScrollableLocations from './ScrollableLocations';

export default class Location extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: 'Canada',
      selectedRegion: 'Alberta',
      countries: [
        {country: 'Canada'},
        {country: 'USA'}
      ],
      locations: [
          { country: 'Canada', region: 'Alberta' },
          // { country: 'Canada', region: 'British Columbia' },
          // { country: 'Canada', region: 'Manitoba' },
          // { country: 'Canada', region: 'New Brunswick' },
          // { country: 'Canada', region: 'Newfoundland and Labrador' },
          // { country: 'Canada', region: 'Northwest Territories' },
          // { country: 'Canada', region: 'Nova Scotia' },
          // { country: 'Canada', region: 'Nunavut' },
          // { country: 'Canada', region: 'Ontario' },
          // { country: 'Canada', region: 'Prince Edward Island' },
          // { country: 'Canada', region: 'Quebec' },
          // { country: 'Canada', region: 'Saskatchewan' },
          // { country: 'Canada', region: 'Yukon' },
          { country: 'USA', region: 'Alabama' },
          { country: 'USA', region: 'Alaska' },
          { country: 'USA', region: 'Arizona' },
          { country: 'USA', region: 'Arkansas' },
          { country: 'USA', region: 'California' },
          { country: 'USA', region: 'Colorado' },
          { country: 'USA', region: 'Connecticut' },
          { country: 'USA', region: 'Delaware' },
          { country: 'USA', region: 'Florida' },
          { country: 'USA', region: 'Georgia' },
          { country: 'USA', region: 'Hawaii' },
          { country: 'USA', region: 'Idaho' },
          { country: 'USA', region: 'Illinois' },
          { country: 'USA', region: 'Indiana' },
          { country: 'USA', region: 'Iowa' },
          { country: 'USA', region: 'Kansas' },
          { country: 'USA', region: 'Kentucky' },
          { country: 'USA', region: 'Louisiana' },
          { country: 'USA', region: 'Maine' },
          { country: 'USA', region: 'Maryland' },
          { country: 'USA', region: 'Massachusetts' },
          { country: 'USA', region: 'Michigan' },
          { country: 'USA', region: 'Minnesota' },
          { country: 'USA', region: 'Mississippi' },
          { country: 'USA', region: 'Missouri' },
          { country: 'USA', region: 'Montana' },
          { country: 'USA', region: 'Nebraska' },
          { country: 'USA', region: 'Nevada' },
          { country: 'USA', region: 'New Hampshire' },
          { country: 'USA', region: 'New Jersey' },
          { country: 'USA', region: 'New Mexico' },
          { country: 'USA', region: 'New York' },
          { country: 'USA', region: 'North Carolina' },
          { country: 'USA', region: 'North Dakota' },
          { country: 'USA', region: 'Ohio' },
          { country: 'USA', region: 'Oklahoma' },
          { country: 'USA', region: 'Oregon' },
          { country: 'USA', region: 'Pennsylvania' },
          { country: 'USA', region: 'Rhode Island' },
          { country: 'USA', region: 'South Carolina' },
          { country: 'USA', region: 'South Dakota' },
          { country: 'USA', region: 'Tennessee' },
          { country: 'USA', region: 'Texas' },
          { country: 'USA', region: 'Utah' },
          { country: 'USA', region: 'Vermont' },
          { country: 'USA', region: 'Virginia' },
          { country: 'USA', region: 'Washington' },
          { country: 'USA', region: 'West Virginia' },
          { country: 'USA', region: 'Wisconsin' },
          { country: 'USA', region: 'Wyoming' },
      ]
    }
  }


  //TODO
  fetchLocations = () => {}

  componentDidMount() {
    this.fetchLocations();

  }

  handleCountryChange = ( event, value) => {
    this.setState({selectedCountry: value});
  }

  handleRegionChange = ( event, value ) => {
    this.setState({selectedRegion: value});
    this.props.sendData(value);
    console.log(value);
  }

  render() {
    return (
    <div className='Location'>
      Location
      <Autocomplete
        className="search-bar"
        options={ this.state.countries }
        getOptionLabel={(option) => option.country}
        style={{ width: 300 }}
        onInputChange={ this.handleCountryChange }
        renderInput={(params) => <TextField {...params} label="Select a country" variant="outlined" />}
      />
      <Autocomplete
        className="search-bar"
        options={ this.state.locations.filter(eachLocation => eachLocation.country === this.state.selectedCountry ) }
        getOptionLabel={(option) => option.region}
        style={{ width: 300 }}
        onInputChange={ this.handleRegionChange }
        renderInput={(params) => <TextField {...params} label="Select a province or a state" variant="outlined" />}
      />
      {/* <ScrollableLocations locations={this.state.locations}/> */}
    </div>)
  }
}
