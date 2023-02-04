import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	LabelList,
} from "recharts";
import "./StylePage.css";

// create graphs number of employees that gave or don't gave gift and food
const Graphs = () => {
	const baseURL = "http://10.201.128.66:3007";
	const [dataGift, setDataGift] = useState(null);
	const [dataFood, setDataFood] = useState(null);
	const [width, setWidth] = useState(600);
	const [height, setHeight] = useState(400);


	//  resize graphs when window size change
	const handleResize = () => {
		if (window.innerWidth < 500) {
			setWidth(400);
			setHeight(400);
		} else {
			setWidth(600);
			setHeight(400);
		}
	};

	// prapere data for graphs
	async function showGraphs() {
		const responseG = await axios.get(baseURL + "/total-gift");
		const gift_total = responseG.data;
		const responseF = await axios.get(baseURL + "/total-food");
		const food_total = responseF.data;


		const new_data_g = [
			{
				name: "market",
				type: "gift",
				yes: gift_total.MARKETING[0],
				no: gift_total.MARKETING[1],
			},
			{
				name: "admin",
				type: "gift",
				yes: gift_total.ADMIN[0],
				no: gift_total.ADMIN[1],
			},
			{
				name: "product",
				type: "gift",
				yes: gift_total.PRODUCTION[0],
				no: gift_total.PRODUCTION[1],
			},
		];

		const new_data_f = [
			{
				name: "market",
				type: "food",
				yes: food_total.MARKETING[0],
				no: food_total.MARKETING[1],
			},
			{
				name: "admin",
				type: "food",
				yes: food_total.ADMIN[0],
				no: food_total.ADMIN[1],
			},
			{
				name: "product",
				type: "food",
				yes: food_total.PRODUCTION[0],
				no: food_total.PRODUCTION[1],
			},
		];

		setDataGift(new_data_g);
		setDataFood(new_data_f);
	}

	window.addEventListener("resize", handleResize);
	useEffect(() => {
		showGraphs();
		handleResize();
	}, []);

	return (
		<div>
			<div>
				<div className="Title">Gift</div>
			</div>
			<BarChart
				width={width}
				height={height}
				data={dataGift}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 5,
					padding: 5,
				}}
				className="Graph"
			>
				<CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar
					dataKey="no"
					fill="#5c3d99"
					stackId="a"
				/>
				<Bar
					dataKey="yes"
					fill="#e76f51"
					stackId="a"
				/>
			</BarChart>
			<div className="Title">Meal</div>
			<BarChart
				width={width}
				height={height}
				data={dataFood}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 5,
					padding: 5,
				}}
				className="Graph"
			>
				<CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="no" fill="#5c3d99" stackId="a" />
				<Bar dataKey="yes" fill="#e76f51" stackId="a" />
			</BarChart>
		</div>
	);
};

export default Graphs;
