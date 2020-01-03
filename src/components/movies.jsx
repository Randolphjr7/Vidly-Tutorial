import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from './common/like';


class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    console.log(movie);
    const newMoviesList = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: newMoviesList });
  };

  handleLike = (movie) => {
    console.log('the movie bitches!', movie);
    const movies  = [...this.state.movies];
    const index   = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  getMovieListLength() {
    console.log(this.state.movies.length);
    if(this.state.movies.length === 0){
      return <h1>There are no movies in the database</h1>;
    }
    else if(this.state.movies.length === 1){
      return <h1>Showing {this.state.movies.length} movie in the database</h1>
    }
    return <h1>Showing {this.state.movies.length} movies in the database.</h1>;
  }


  render() {
    return (
      
      <div>

      {this.getMovieListLength()}

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
            {this.state.movies.map(eachMovie => (
              <tr key={eachMovie._id}>
                <td>{eachMovie.title}</td>
                <td>{eachMovie.genre.name}</td>
                <td>{eachMovie.numberInStock}</td>
                <td>{eachMovie.dailyRentalRate}</td>
                <td>
                  <Like liked={eachMovie.liked} onClick={() => this.handleLike(eachMovie)} />
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

      </div>
    );
  }
}

export default Movies;
