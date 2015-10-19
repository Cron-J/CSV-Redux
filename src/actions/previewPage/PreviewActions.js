import * as types from 'constants/ActionTypes';
import api from 'utils/api/attributeSection';

export function handleChanges(data) {
  return { type: types.HANDLESEARCHATTRIBUTE, payload: { data } };
}

export function previewFile() {
  return {
    type: types.RESETSEARCH
  };
}

