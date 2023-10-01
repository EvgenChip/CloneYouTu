import { Component, ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode | ReactNode[] },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode | ReactNode[] }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong. <a href="/">return to main page</a>
        </h1>
      );
    }

    return this.props.children;
  }
}
