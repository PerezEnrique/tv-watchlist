import React from "react";
import { IoTelescopeOutline } from "react-icons/io5";
import { IoMdSad } from "react-icons/io";

function NoShow({ afterQuery }) {
	return (
		<section className="no-show">
			<div className="no-show__icon">
				{!afterQuery ? <IoTelescopeOutline /> : <IoMdSad />}
			</div>
			<p className="no-show__message">
				{!afterQuery
					? "Hello there! Type the name of the show you have in mind"
					: "Hmm, we didn't find a show with that name"}
			</p>
		</section>
	);
}

export default NoShow;
