import * as React from 'react';
import { ThemeContext } from 'styled-components';

const Logo = ({ className }: { className?: string }) => {
  const theme = React.useContext(ThemeContext);

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <svg className={className} viewBox="0 0 128 128">
      <path d="M98 7C107.941 7 116 15.0589 116 25V123C106.059 123 98 114.941 98 105V7Z" fill={secondary} />
      <path d="M55 7H98V25H55V7Z" fill={secondary} />
      <path d="M116 109H128V123H116V109Z" fill={secondary} />
      <path d="M98 25V34C98 34 98.0475 29.0475 96 27C93.9524 24.9525 89 25 89 25H98Z" fill={secondary} />
      <path d="M116 109V100C116 100 115.952 104.952 118 107C120.048 109.048 125 109 125 109H116Z" fill={secondary} />
      <path d="M12 25C12 15.0589 20.0589 7 30 7V105C30 114.941 21.9411 123 12 123V25Z" fill={primary} />
      <path d="M30 7H55V25H30V7Z" fill={primary} />
      <path d="M55 7C64.9411 7 73 15.0589 73 25V119C73 121.209 71.2091 123 69 123H59C56.7909 123 55 121.209 55 119V7Z" fill={primary} />
      <path d="M0 109H12V123H0V109Z" fill={primary} />
      <path d="M30 25H39C39 25 34.0475 24.9525 32 27C29.9525 29.0476 30 34 30 34V25Z" fill={primary} />
      <path d="M55 25V34C55 34 55.0475 29.0475 53 27C50.9524 24.9525 46 25 46 25H55Z" fill={primary} />
      <path d="M12 109H3C3 109 7.95247 109.048 10 107C12.0475 104.952 12 100 12 100L12 109Z" fill={primary} />
    </svg>
  );
};

Logo.defaultProps = {
  className: null,
};

export default Logo;
