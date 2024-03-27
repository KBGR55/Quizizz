const commonColor = {
  commonWhite: '#FFFFFF',
  commonBlack: '#070F2B',
  activeColor: '#DE5E69', 
  deactiveColor: '#DE5E6950', 
  boxActiveColor: '#DE5E6940', 
};

const light = {
  themeColor: '#FFFFFF',
  white: '#070F2B',
  sky: '#535C91',
  gray: 'gray',
  ...commonColor,
};

const dark = {
  themeColor: '#070F2B',
  white: '#FFFFFF',
  sky: '#1B1A55',
  gray: 'white',
  ...commonColor,
};

export default { light, dark };
