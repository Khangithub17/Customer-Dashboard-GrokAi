// filepath: /frontend/src/components/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ background: 'linear-gradient(to right, purple, pink)', WebkitBackgroundClip: 'text', color: 'transparent', textTransform: 'uppercase', animation: 'fadeIn 2s' }}>
            Something Went Wrong
          </h1>
          <p>Please try refreshing the page or come back later.</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;