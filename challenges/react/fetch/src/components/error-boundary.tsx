import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  fallback: (error: Error) => ReactNode;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

// Error boundaries still have to be class components: there is no hook for it.
export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  render() {
    const { error } = this.state;
    return error ? this.props.fallback(error) : this.props.children;
  }
}
