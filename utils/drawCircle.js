export default function drawSerialNumber() {
  const numberCircle = Path()
    .moveTo(50, 0) // 起点位置
    .arc(0, 100, 50) // 将 (50,0) 看成新的坐标系（0,0），由此进行 顺时针（100正） 的画半弧。
    .arc(0, -100, 50) // 将 (0,100) 看成新的坐标系（0,0），由此进行 逆时针（-100负） 的画半弧。
    .close();
}
