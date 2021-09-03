const opendesign_style = {
  resolutions: {
    SmallMinWidth: 0, SmallMaxWidth: 480,
    MediumMinWidth: 480, MediumMaxWidth: 1440,
    LargeMinWidth: 1440, LargeMaxWidth: 1920
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
    width: 330,
    height: 330,
    marginRight: 25,
    marginBottom: 25,
    marginBottomLast: 0,
    small: { marginRightLast: 25, cols: 1, },
    medium: { marginRightLast: 25, cols: 3, },
    large: { marginRightLast: 25, cols: 5, },
    big: { marginRightLast: 25, cols: 5, },
  },
  group_margin: {
    marginRight: 26,
    marginBottom: 26,
    marginBottomLast: 0,
    small: { marginRightLast: 26, cols: 1,},
    medium: { marginRightLast: 26, cols: 1, },
    large: { marginRightLast: 26, cols: 2, },
    big: { marginRightLast: 26, cols: 2, },
  },
  designer_margin: {
    width: 565,
    height: 150,
    marginRight: 15,
    marginBottom: 33,
    marginBottomLast: 0,
    small: { marginRightLast: 15, cols: 1, },
    medium: { marginRightLast: 15, cols: 2, },
    large: { marginRightLast: 15, cols: 3, },
    big: { marginRightLast: 15, cols: 3, },
  }
}

export default opendesign_style 

// const opendesign_style = {
//   resolutions: {
//     SmallMinWidth: 0, SmallMaxWidth: 480,
//     MediumMinWidth: 480, MediumMaxWidth: 1440,
//     LargeMinWidth: 1440, LargeMaxWidth: 1920
//   },
//   font: {
//     notoSans: "'Noto Sans KR', sans-serif",
//     notoSerif: "'Noto Serif', serif",
//     lineHeight: 1.4,
//     size: {
//       heading1: "3.2rem",
//       heading2: "2.6rem",
//       heading3: "1.9rem",
//       heading4: "1.3rem",
//       paragraph: "1rem",
//       small: "0.86rem"
//     }
//   },
//   color: {
//     main: {
//       brightness: "#FFF6F7",
//       light: "#FACBCB",
//       basic: "#E72327",
//       dark: "#BF1D1F"
//     },
//     gray: {
//       light: "#EAEEEF",
//       basic: "#CED3D6",
//       dark: "#4D5256"
//     },
//     sub: {
//       bule: {
//         light: "#87B2CC",
//         basic: "#10669A",
//         dark: "#0B4B73"
//       },
//       green: {
//         light: "#2ECC71",
//         basic: "#2ABD68",
//         dark: "#27AE60"
//       },
//       purple: {
//         light: "#A49EB6",
//         basic: "#4A3E6D",
//         dark: "#2B2440"
//       }
//     },
//     grayScale: {
//       scale0: "#F8FAFB",
//       scale1: "#F1F5F5",
//       scale2: "#EAEEEF",
//       scale3: "#E1E4E6",
//       scale4: "#CED3D6",
//       scale5: "#A9AFB3",
//       scale6: "#878D91",
//       scale7: "#4D5256",
//       scale8: "#363A3C",
//       scale9: "#292A2B"
//     }
//   },
//   margin: {
//     basic: "1rem",
//     bottom: {
//       setcion: "3.5rem",
//       paragraph: "2rem",
//       title: "3rem",
//       small: "0.5rem"
//     }
//   },
//   gridContent: {
//     mobile: 320,
//     tablet: 700,
//     computer: 850,
//     largeScreen: 1100,
//     wideScreen: 1800,
//   },
//   design_margin: {
//     width: 307,
//     height: 450,
//     marginRight: 48,
//     marginBottom: 44,
//     marginBottomLast: 44,
//     small: { marginRightLast: 48, cols: 1, },
//     medium: { marginRightLast: 48, cols: 3, },
//     large: { marginRightLast: 48, cols: 5, },
//     big: { marginRightLast: 48, cols: 5, },
//   },
//   group_margin: {
//     marginRight: 38,
//     marginBottom: 44,
//     marginBottomLast: 44,
//     small: { marginRightLast: 38, cols: 1,},
//     medium: { marginRightLast: 38, cols: 1, },
//     large: { marginRightLast: 38, cols: 2, },
//     big: { marginRightLast: 38, cols: 2, },
//   },
//   designer_margin: {
//     width: 330,
//     height: 510,
//     marginRight: 136,
//     marginBottom: 44,
//     marginBottomLast: 44,
//     small: { marginRightLast: 136, cols: 1,},
//     medium: { marginRightLast: 136, cols: 3, },
//     large: { marginRightLast: 136, cols: 4, },
//     big: { marginRightLast: 136, cols: 4, },
//   },


//   my_design_margin: {
//     width: 238,
//     height: 348,
//     marginRight: 44,
//     marginBottom: 44,
//     marginBottomLast: 44,
//     small: { marginRightLast: 44, cols: 1, },
//     medium: { marginRightLast: 44, cols: 3, },
//     large: { marginRightLast: 44, cols: 4, },
//     big: { marginRightLast: 44, cols: 4, },
//   },
//   my_group_margin: {
//     width: 536,
//     height: 191,
//     marginRight: 30,
//     marginBottom: 30,
//     marginBottomLast: 30,
//     small: { marginRightLast: 30, cols: 1, },
//     medium: { marginRightLast:30, cols: 1, },
//     large: { marginRightLast: 30, cols: 2, },
//     big: { marginRightLast: 30, cols: 2, },
//   },
//   my_designer_margin: {
//     width: 252,
//     height: 390,
//     marginRight: 34,
//     marginBottom: 44,
//     marginBottomLast: 44,
//     small: { marginRightLast: 44, cols: 1, },
//     medium: { marginRightLast: 44, cols: 3, },
//     large: { marginRightLast: 44, cols: 4, },
//     big: { marginRightLast: 44, cols: 4, },
//   },
// }

// export default opendesign_style 