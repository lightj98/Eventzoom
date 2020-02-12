import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import Event from './Event';
import Search from './Search';
import Registration from '../components/Registration';
import Login from '../components/Login';
import Series from '../components/Series';


class App extends Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool.isRequired,
	};

	render = () => <div>
		<NavBar />
		<Route exact path="/" >
			<Search />
		</Route>
<<<<<<< HEAD
		<Route exact path="/events/:eventid" component={(props) => <Event {...props.match.params} /> } />
		<Route exact path="/Registration" render={(props) => <Registration {...props} />} />
		<Route exact path="/Login" render={(props) => <Login {...props} />} />
=======
		<Route exact path="/series/:seriesId" >
			<Series />
		</Route>
		<Route exact path="/event" >

			<Event
				title={'Cat-a-Burger?'}
				description={'Cats like burgers?? Come to this talk where we talk all about the different wonders of a cats diet. Some cats love to eat burgers like this little one below, other hate them however. With a specialist speaker from cardiff who is well trained'}
				image={'https://i.imgur.com/vgZrB5U.jpg'}
				datetime={new Date('03-01-2020')}
				speaker={'John Smith'}
				organiser={'Smith John'}
				vagueLocation={'Cardiff'}
				disabilityAccess={true}
				curAttending={50} capacity={55}
			/>
		</Route>
>>>>>>> Adds Series and SeriesInfo components
	</div>
}

const mapStateToProps = (state) => ({
	isLoggedIn: state.simpleReducer.status,
});

export default connect(mapStateToProps)(App);
