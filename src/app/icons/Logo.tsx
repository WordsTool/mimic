import * as React from 'react';
import { ThemeContext } from 'styled-components';

const Logo = ({ className }: { className?: string }) => {
  const theme = React.useContext(ThemeContext);

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <svg className={className} viewBox="0 0 128 128">
      <path
        d="M124 109C119.582 109 116 105.418 116 101V25C116 15.0589 107.941 7 98 7H55V21C55 23.2091 56.7909 25 59 25H90C94.4183 25 98 28.5817 98 33V105C98 114.941 106.059 123 116 123H128V109H124Z"
        fill={secondary}
      />
      <path
        d="M4 109C8.41828 109 12 105.418 12 101V25C12 15.0589 20.0589 7 30 7H55C64.9411 7 73 15.0589 73 25V119C73 121.209 71.2091 123 69 123H59C56.7909 123 55 121.209 55 119V33C55 28.5817 51.4183 25 47 25H38C33.5817 25 30 28.5817 30 33V105C30 114.941 21.9411 123 12 123H0V109H4Z"
        fill={primary}
      />
    </svg>
  );
};

Logo.defaultProps = {
  className: null,
};

export default Logo;
