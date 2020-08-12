import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    hasErrored: false,
  };

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="error-boundary">
          <img
            src="https://i.imgur.com/U3vTGjX.png"
            className="error-boundary__img"
          />
          <h2 className="error-boundary__text">SOMETHING WENT WRONG</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
