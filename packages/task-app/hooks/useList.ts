import React from "react";

export interface CheckableItem {
  id: string;
  name: string;
  selected: boolean;
}

export interface IUseCheckList {
  checkList: CheckableItem[] | null;
  selectItem: (item: CheckableItem) => void;
}

export const useCheckList = (data: CheckableItem[] | null = null): IUseCheckList => {
  const [checkList, setCheckList] = React.useState(data);

  function selectItem(selectedItem: CheckableItem) {
    if (!checkList) return;

    const filteredList = checkList.filter((item) => item.id !== selectedItem.id);
    const updatedItem: CheckableItem = { ...selectedItem, selected: Boolean(!selectedItem.selected) };
    filteredList.push(updatedItem);
    setCheckList(filteredList);
  }

  return {
    checkList,
    selectItem
  }
}