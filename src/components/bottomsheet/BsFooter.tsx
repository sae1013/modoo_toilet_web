import { css } from '../../../styled-system/css';

interface BsFooterProps {
  children?: React.ReactNode;
}

const BsFooter = ({ children }: BsFooterProps) => {
  return <div className={css({})}>{children}</div>;
};

export default BsFooter;