import { render } from 'testUtils';
import Page from '.';

describe('<Page />', () => {
  const CustomPage = (
    <Page title="Custom Page">
      <p>Custom Page Content</p>
    </Page>
  );

  it('renders without crashing', () => {
    const { unmount } = render(CustomPage);
    unmount();
  });

  describe('page header', () => {
    describe('back button', () => {
      it('renders back button when not on the root page', () => {
        render(CustomPage, { route: '/outtages' });
        expect(
          document.querySelector('.ant-page-header-back-button')
        ).toBeInTheDocument();
      });

      it('does not render the back button when on the root page', () => {
        render(CustomPage);
        expect(
          document.querySelector('.ant-page-header-back-button')
        ).not.toBeInTheDocument();
      });
    });

    describe('breadcrumbs', () => {
      // fill out something here
    });
  });
});
