import { v4 as uuidv4 } from "uuid";
import imageNotFound from "../resources/image-not-found.png";

function Card({ show: { id, image, name, genres } }) {
	const showImage = image ? image.original : imageNotFound;

	return (
		<div className="card hvr-bounce-in hvr-bounce-in:hover, hvr-bounce-in:focus, hvr-bounce-in:active">
			<img className="card__img cursor-pointer" src={showImage} alt={name} />
			<div className="card__body">
				<h2 className="card__body__title cursor-pointer">{name}</h2>
				{genres && (
					<div>
						{genres.map(genre => (
							<span className="genre" key={uuidv4()}>
								{genre}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Card;
