type PaletteItem = {
  light: string,
  main: string,
  dark: string,
};

type CommonPalette = {
  primary: PaletteItem,
  secondary: PaletteItem,
  highlight: {
    active: string,
    hover: string,
  },
};

type ColorPalette = {
  surface: PaletteItem,
  text: PaletteItem
};

type Palette = CommonPalette & ColorPalette;

type Schema = { palette: Palette };

const common: CommonPalette = {
  primary: {
    light: '#89c2ff',
    main: '#4C92FF',
    dark: '#0065cb',
  },
  secondary: {
    light: '#ffad42',
    main: '#F57C00',
    dark: '#bb4d00',
  },
  highlight: {
    active: 'rgba(76, 146, 255, 0.40)',
    hover: 'rgba(76, 146, 255, 0.20)',
  },
};

const darkPalette: ColorPalette = {
  surface: {
    light: '#515260',
    main: '#282a36',
    dark: '#0d1120',
  },
  text: {
    light: 'rgba(255, 255, 255, 0.53)',
    main: 'rgba(255, 255, 255, 0.87)',
    dark: 'rgba(255,255,255,0.53)',
  },
};

const lightPalette: ColorPalette = {
  surface: {
    light: '#F6F6F6',
    main: '#ffffff',
    dark: '#F6F6F6',
  },
  text: {
    light: 'rgba(0, 0, 0, 0.58)',
    main: 'rgba(0, 0, 0, 1)',
    dark: 'rgba(0, 0, 0, 1)',
  },
};

export const dark: Schema = {
  palette: {
    ...common,
    ...darkPalette,
  },
};

export const light: Schema = {
  palette: {
    ...common,
    ...lightPalette,
  },
};
