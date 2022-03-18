import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../test-utils";
import { ProfileButton } from "./ProfileButton";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}))

describe('ProfileButton component test suite', () => {
  test('should show nothing if no authToken', () => {
    // arrange
    const authToken = null;
    // act
    const { container } = render(<ProfileButton authToken={authToken} userLoading={false} email="" />);
    // assert
    expect(container.hasChildNodes()).toBe(false);
  });
  test('should show email when a authToken and email are provided', () => {
    // arrange
    const mockAuthToken = 'mock_token';
    const mockEmail = 'fake@email.it';
    // act
    render(<ProfileButton authToken={mockAuthToken} userLoading={false} email={mockEmail} />, { shouldUseRouter: true });
    // assert
    expect(screen.getByText(mockEmail)).toBeInTheDocument();
    const profileItem = screen.getByText(/profile/i);
    expect(profileItem).toBeInTheDocument();
    expect(profileItem).not.toBeVisible();
  });
  test('should show progress circle when has an authToken and user is loading', () => {
    // arrange
    const mockAuthToken = 'mock_token';
    // act
    render(<ProfileButton authToken={mockAuthToken} userLoading={true} email={''} />, { shouldUseRouter: true });
    // assert
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  test('should show menu when has an authToken and menu button is clicked', () => {
    // arrange
    const mockAuthToken = 'mock_token';
    const mockEmail = 'fake@email.it';
    // act
    render(<ProfileButton authToken={mockAuthToken} userLoading={false} email={mockEmail} />, { shouldUseRouter: true });
    const menuButton = screen.getByLabelText('account of current user');
    fireEvent.click(menuButton);
    // assert
    const profileItem = screen.getByText(/profile/i);
    expect(profileItem).toBeInTheDocument();
    expect(profileItem).toBeVisible();
  });
  test('should fire navigate with path "profile" when menu item is clicked', () => {
    // arrange
    const mockAuthToken = 'mock_token';
    const mockEmail = 'fake@email.it';
    // act
    render(<ProfileButton authToken={mockAuthToken} userLoading={false} email={mockEmail} />, { shouldUseRouter: true });
    const menuButton = screen.getByLabelText('account of current user');
    fireEvent.click(menuButton);

    const profileItem = screen.getByText(/profile/i);
    expect(profileItem).toBeInTheDocument();
    expect(profileItem).toBeVisible();
    fireEvent.click(profileItem);
    // assert
    expect(mockedNavigate).toHaveBeenCalledWith('/profile');
  });
})