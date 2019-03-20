export function save(calculateResult, rootStore) {
  const scaleScheduleIndex = rootStore.scaleCurrentIndex;
  const scaleScheduleLength = rootStore.scaleName.length - 1;
  const currentScaleName = rootStore.scaleName[scaleScheduleIndex];
  const data = calculateResult;
  let scaleInfo = Object.assign(data, { scaleName: currentScaleName });
  console.log("sacle_DATA_", scaleInfo);
  rootStore.saveFinishedScale(scaleInfo);

  console.log("rootStore.finishedScale_", rootStore.finishedScale);
  if (scaleScheduleIndex < scaleScheduleLength) {
    console.log("goToNext");
    rootStore.setScaleIndex(scaleScheduleIndex + 1);
    // 路由到下一个量表页面
    return;
  } else {
    console.log("goToResultPage");
    // 路由到结果页面
  }
}
