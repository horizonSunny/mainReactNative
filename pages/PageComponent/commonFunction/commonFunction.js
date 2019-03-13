export function jumpWithParameter(order, state, props) {
  props.callBack(state.questionModel, state.questionInfo, order);
}
