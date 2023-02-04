import { Link } from 'react-router-dom';
import './StylePage.css';
import gift from '../images/mdi_gift.svg';
import food from '../images/material-symbols_food-bank.svg';
import check from '../images/material-symbols_check-circle.svg';
import Graphs from './Graphs';

// show graphs and link to Food Page Gift Page and Check Status Page 
const Home = () => {
	return (
		<div className="WrapperPage">
			<div className="WrapperLayout">
				<div className="Layout">
					<div className="Title">Mary Christmas</div>
					<div className="Divider" />
					<div className="icons">
						<div className="icon">
							<img src={gift} />
							<Link to="/gift">Gift</Link>
						</div>
						<div className="icon">
							<img src={food} />
							<Link to="/food">Meal</Link>
						</div>
						<div className="icon">
							<img src={check} />
							<Link to="/check">Check Status</Link>
						</div>
					</div>
				</div>
				<div className="LayoutHome">
					<Graphs />
				</div>
			</div>
		</div>
	);
};

export default Home;
