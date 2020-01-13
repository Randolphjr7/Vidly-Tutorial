import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres'},...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    console.log(movie);
    const newMoviesList = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: newMoviesList });
  };

  handleLike = movie => {
    console.log("the movie bitches!", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
  };

  getMovieListLength = filtered => {
    if (filtered.length === 0) {
      return <h1>There are no movies in the database</h1>;
    } else if (filtered.length === 1) {
      return <h1>Showing {filtered.length} movie in the database</h1>;
    }
    return <h1>Showing {filtered.length} movies in the database.</h1>;
  }

  render() {

    const { pageSize, currentPage, movies, selectedGenre } = this.state;

    const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id) : movies;
    const moviesPaginate = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {this.getMovieListLength(filtered)}

          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {moviesPaginate.map(eachMovie => (
                <tr key={eachMovie._id}>
                  <td>{eachMovie.title}</td>
                  <td>{eachMovie.genre.name}</td>
                  <td>{eachMovie.numberInStock}</td>
                  <td>{eachMovie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={eachMovie.liked}
                      onClick={() => this.handleLike(eachMovie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(eachMovie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
