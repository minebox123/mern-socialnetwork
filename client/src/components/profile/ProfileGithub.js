import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  state = {
    clientId: "8b316a6b5afbfee90ef1",
    clientSecret: "25fb3e50c30341b70b64fa448c776cc8c71d62d5",
    count: 5,
    sort: "created: asc",
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(item => (
      <div key={item.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={item.html_url}
                className="text-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            </h4>
            <p>{item.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {item.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {item.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {item.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
