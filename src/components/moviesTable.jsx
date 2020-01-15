import React from "react";
import Like from "./common/like";

const MoviesTable = props => {
  // object destructuring should be done at the start of every functional component
  const { movies, onDelete, onLike, onSort } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort('title')}>Title</th>
          <th onClick={() => onSort('genre.name')}>Genre</th>
          <th onClick={() => onSort('numberInStock')}>Stock</th>
          <th onClick={() => onSort('dailyRentalRate')}>Rate</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map(eachMovie => (
          <tr key={eachMovie._id}>
            <td>{eachMovie.title}</td>
            <td>{eachMovie.genre.name}</td>
            <td>{eachMovie.numberInStock}</td>
            <td>{eachMovie.dailyRentalRate}</td>
            <td>
              <Like
                liked={eachMovie.liked}
                onClick={() => onLike(eachMovie)}
              />
            </td>
            <td>
              <button
                onClick={() => onDelete(eachMovie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
