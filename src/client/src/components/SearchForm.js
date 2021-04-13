function SearchForm({ handleChange, searchTerm }) {
	return (
		<form className="form">
			<div className="input-group">
				<label className="label" htmlFor="shows-name">
					Search a show to add to your watchlist
				</label>
				<input
					className="input"
					type="text"
					id="shows-name"
					value={searchTerm}
					onChange={handleChange}
				/>
			</div>
		</form>
	);
}

export default SearchForm;
