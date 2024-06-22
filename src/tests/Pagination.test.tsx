import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pagination from '../components/Pagination';
import { PaginationProps } from '../interfaces/PaginationProps';

// Mock data and functions for testing
const mockOnPageChange = jest.fn();
const defaultProps: PaginationProps = {
  currentPage: 1,
  totalPages: 5,
  onPageChange: mockOnPageChange,
};

const renderComponent = (props = defaultProps) => {
  return render(<Pagination {...props} />);
};

describe('Pagination Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct number of pages', () => {
    renderComponent();

    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });

  it('disables the current page link', () => {
    renderComponent();

    const currentPageLink = screen.getByText('1');
    expect(currentPageLink).toHaveClass('disabled');
  });

  it('calls onPageChange with the correct page number when a page link is clicked', () => {
    renderComponent();

    const pageLink = screen.getByText('2');
    fireEvent.click(pageLink);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('does not call onPageChange when the current page link is clicked', () => {
    renderComponent();

    const currentPageLink = screen.getByText('1');
    fireEvent.click(currentPageLink);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('renders the correct class for non-current page links', () => {
    renderComponent();

    const pageLink = screen.getByText('2');
    expect(pageLink).toHaveClass('hover-enabled');
  });
});