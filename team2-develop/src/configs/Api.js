export const apiActions = async (
  dispatch,
  type_request,
  methodPath,
  type_success,
  type_fail
) => {
  try {
    dispatch({ type: type_request });
    const { data } = await methodPath;
    dispatch({
      type: type_success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: type_fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
