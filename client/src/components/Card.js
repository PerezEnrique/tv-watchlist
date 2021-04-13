import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaRegCalendarPlus, FaCalendarTimes } from "react-icons/fa";
import { AuthContext } from "../contexts/authContext";
import { showAlreadyOnWatchlist } from "../utils/helpers";
import imageNotFound from "../resources/image-not-found.png";

function Card({ show, handleClickOnShow, handleWatchlist }) {
	const { id, image, name, genres } = show;
	const { currentUser } = useContext(AuthContext);
	const showImage = image ? image.original : imageNotFound;

	return (
		<div className="card hvr-bounce-in hvr-bounce-in:hover, hvr-bounce-in:focus, hvr-bounce-in:active">
			<img
				className="card__img cursor-pointer"
				src={showImage}
				alt={name}
				onClick={() => handleClickOnShow(id)}
			/>
			<div className="card__body">
				<h2
					className="card__body__title cursor-pointer"
					onClick={() => handleClickOnShow(id)}
				>
					{name}
				</h2>
				{genres && (
					<div>
						{genres.map(genre => (
							<span className="genre" key={uuidv4()}>
								{genre}
							</span>
						))}
					</div>
				)}
				{currentUser && (
					<span
						className="card__body__watchlist-icon cursor-pointer"
						onClick={() => handleWatchlist(show)}
					>
						{!showAlreadyOnWatchlist(currentUser, id) ? (
							<FaRegCalendarPlus />
						) : (
							<FaCalendarTimes />
						)}
					</span>
				)}
			</div>
		</div>
	);
}

export default Card;
