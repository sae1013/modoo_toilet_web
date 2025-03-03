import { styled } from '../../../styled-system/jsx';

interface BsFooterProps {
  children?: React.ReactNode;
}

const Wrapper = styled('div', {
  base: {
    paddingBottom: '.3rem',
  },
});

const BsFooter = ({ children }: BsFooterProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BsFooter;
