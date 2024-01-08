import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./StylePage.css";

const Graphs = () => {
	const [dataGift, setDataGift] = useState(null);


	const showGraphs = async () => {
		const res = await axios.get("/total-gift");
		const gift_total = res.data;

		const new_data_g =
		{
			name: "ALL",
			type: "gift",
			yes: gift_total.Y,
			no: gift_total.N,
		}

		setDataGift(new_data_g);
	};


	useEffect(() => {
		showGraphs();
	}, []);

	return (
		<div className="section section-info">
			<div className="info-block">
				<dl>
					<dt>{dataGift ? dataGift.yes + dataGift.no : 0}</dt>
					<dd>All Employees</dd>
				</dl>
			</div>

			<div className="info-block last">
				<dl>
					<dt>{dataGift ? dataGift.no : 0}</dt>
					<dd>Giftless Employee</dd>
				</dl>
			</div>
		</div>
	);
};

export default Graphs;
