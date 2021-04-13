import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaRegCalendarPlus, FaCalendarTimes } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../contexts/authContext";
import { objectIsEmpty, showAlreadyOnWatchlist } from "../utils/helpers";
import imageNotFound from "../resources/image-not-found.png";

function SingleShow({ showScreenIsShown, closeShowScreen, handleWatchlist, show }) {
	const { currentUser } = useContext(AuthContext);
	const { id, image, name, rating, premiered, summary, genres } = show;
	const showImage = image ? image.medium : imageNotFound;
	const cleanedSummary = summary ? summary.replace(/<.+?>/g, "") : null;

	return (
		<section
			className={!showScreenIsShown ? "show-screen" : "show-screen show-screen--active"}
		>
			<span className="show-screen__close-icon cursor-pointer" onClick={closeShowScreen}>
				<FaTimes />
			</span>
			{!objectIsEmpty(show) && (
				<div className="show">
					<div className="show__media">
						<img className="img" src={showImage} alt={name} />
					</div>
					<div className="show__body">
						<h2 className="show__body__title">{name}</h2>
						{cleanedSummary && <p>{cleanedSummary}</p>}
						<dl>
							<div>
								<dt>Premiered:</dt>
								<dd>{premiered ? premiered : "Not available"}</dd>
							</div>
							<div>
								<dt>Rating:</dt>
								<dd>{rating.average ? rating.average : "Not available"}</dd>
							</div>
						</dl>
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
								className="show__body__watchlist-icon cursor-pointer"
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
			)}
		</section>
	);
}

export default SingleShow;
