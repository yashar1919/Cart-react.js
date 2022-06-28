/* 
in function bara in has k tooye Product fght 2 kalame aval ro neshoon bedim
o kolle title ro neshoon nadim k b ham rikhte beshe site */
const shortTitle = (title) => {
    const splitTitle = title.split(" "); //bar asase space kalamat ro joda mikone az ham
    const newTitle = `${splitTitle[0]} ${splitTitle[1]}`;
    return newTitle;
}
export { shortTitle };

const isInCart = (id, state) => {
    const result = !!(state.selectedItems.find(item => item.id === id));
    return result;
}
export { isInCart };

const quantityCount = (id, state) => {
    const index = state.selectedItems.findIndex(item => item.id === id);
    if (index === -1) {
        return false
    } else {
        return state.selectedItems[index].quantity;
    }
}

export { quantityCount };