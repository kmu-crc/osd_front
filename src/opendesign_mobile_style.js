const opendesign_mobile_style = {
  resolutions: {
    SmallMinWidth: 0, SmallMaxWidth: 480,
    MediumMinWidth: 480, MediumMaxWidth: 1440,
    LargeMinWidth: 1440, LargeMaxWidth: 1920
  },
  newresolutions:{
    mini:0,
    small:1050,
    medium:1350,
    large:1650,
    max:1920
  },
  font: {
    notoSans: "'Noto Sans KR', sans-serif",
    notoSerif: "'Noto Serif', serif",
    lineHeight: 1.4,
    size: {
      heading1: "3.2rem",
      heading2: "2.6rem",
      heading3: "1.9rem",
      heading4: "1.3rem",
      paragraph: "1rem",
      small: "0.86rem"
    }
  },
  color: {
    main: {
      brightness: "#FFF6F7",
      light: "#FACBCB",
      basic: "#E72327",
      dark: "#BF1D1F"
    },
    gray: {
      light: "#EAEEEF",
      basic: "#CED3D6",
      dark: "#4D5256"
    },
    sub: {
      bule: {
        light: "#87B2CC",
        basic: "#10669A",
        dark: "#0B4B73"
      },
      green: {
        light: "#2ECC71",
        basic: "#2ABD68",
        dark: "#27AE60"
      },
      purple: {
        light: "#A49EB6",
        basic: "#4A3E6D",
        dark: "#2B2440"
      }
    },
    grayScale: {
      scale0: "#F8FAFB",
      scale1: "#F1F5F5",
      scale2: "#EAEEEF",
      scale3: "#E1E4E6",
      scale4: "#CED3D6",
      scale5: "#A9AFB3",
      scale6: "#878D91",
      scale7: "#4D5256",
      scale8: "#363A3C",
      scale9: "#292A2B"
    }
  },
  margin: {
    basic: "1rem",
    bottom: {
      setcion: "3.5rem",
      paragraph: "2rem",
      title: "3rem",
      small: "0.5rem"
    }
  },
  gridContent: {
    mobile: 320,
    tablet: 700,
    computer: 850,
    largeScreen: 1100,
    wideScreen: 1800,
  },
  design_margin: {
    width: 100,
    height: 137,
    marginRight: 16,
    marginBottom: 14,
    marginBottomLast: 0,
    small: { marginRightLast: 0, cols: 3, },
    medium: { marginRightLast: 0, cols: 3, },
    large: { marginRightLast: 0, cols: 3, },
    big: { marginRightLast: 0, cols: 3, },
  },
  group_margin: {
    marginRight: 16,
    marginBottom: 12,
    marginBottomLast: 0,
    small: { marginRightLast: 0, cols: 1,},
    medium: { marginRightLast: 0, cols: 1, },
    large: { marginRightLast: 0, cols: 1, },
    big: { marginRightLast: 0, cols: 2, },
  },
  designer_margin: {
    width: 335,
    height: 124,
    marginRight: 16,
    marginBottom: 7,
    marginBottomLast: 0,
    small: { marginRightLast: 0, cols: 1, },
    medium: { marginRightLast: 0, cols: 1, },
    large: { marginRightLast: 0, cols: 1, },
    big: { marginRightLast: 0, cols: 1, },
  }
}

export default opendesign_mobile_style 
