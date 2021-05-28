export default function navigateBack({ delta = 1 }) {
  wx.navigateBack({
    delta,
  });
}
