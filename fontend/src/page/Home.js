import { Link } from 'react-router-dom';
import './StylePage.css';
import Graphs from './Graphs';
import { Icon } from '@iconify/react';
import checkO from '@iconify/icons-gg/check-o';
import foodOutline from '@iconify/icons-mdi/food-outline';
import giftOutline from '@iconify/icons-mdi/gift-outline';

// show graphs and link to Food Page Gift Page and Check Status Page 
const Home = () => {
	return (
		<div className="snowflakes-container">
			<div className="layout">
				<div className="title">Mary Christmas</div>
				<div className="icons">
					<Link to="/gift" className="icon" target="_blank">
						<Icon icon={giftOutline} width="35" />
						<div >Gift</div>
					</Link>
					<Link to="/food" className="icon" target="_blank">
						<Icon icon={foodOutline} width="35" />
						<div >Meal</div>
					</Link>
					<Link to="/check" className="icon" target="_blank">
						<Icon icon={checkO} width="35" />
						<div >Check Status</div>
					</Link>
				</div>
			</div>
			<Graphs />
		</div>
	);
};

export default Home;
