import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', direction: 'rtl' }}>
          <h1 style={{ color: '#dc2626' }}>حدث خطأ في التطبيق</h1>
          <p style={{ color: '#4b5563' }}>يرجى تحديث الصفحة أو المحاولة مرة أخرى.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
          >
            تحديث الصفحة
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
