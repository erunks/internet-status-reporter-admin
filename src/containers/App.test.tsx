import { render } from 'testUtils';
import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    const { unmount } = render(<App />);
    unmount();
  });

  it('renders learn react link', () => {
    const { getByText } = render(<App />);
    expect(getByText(/learn react/i)).toBeInTheDocument();
  });
});
