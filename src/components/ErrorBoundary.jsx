import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
          <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ في التطبيق</h1>
            <p className="text-gray-600 mb-6">يرجى تحديث الصفحة أو المحاولة مرة أخرى.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
