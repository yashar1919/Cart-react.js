import React, { createContext, useReducer } from 'react';


const initialState = {
    selectedItems: [],
    itemsCounter: 0,
    totalPrice: 0,
    checkout: false
}

/* 
reduce yek arrowFunction migire va yek meghdare avalie k 0 dadim.
too arrowFunction goftim yek total darim va yek product k product harbar,
yeki az object haye dakhele arraye selectedItems hast. total ham harbar yek meghdari migire
k meghdare avalie ro dadim sefr. har bar quantity ro migire o mirize too total va
total ham bare baadi ba quantity k tooye product has jaam mishe o baz rikhte mishe too total
ta dar nahayad majmooe item ha b dast biad o rikhte beshe too itemsCounter. */
const sumItems = (items) => {
    const itemsCounter = items.reduce((total, product) => total + product.quantity, 0);
    let totalPrice = items.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    return {
        itemsCounter: itemsCounter,
        totalPrice: totalPrice
    }
}



const reducer = (state, action) => {

    switch (action.type) {
        case "ADD_ITEM":
            // sharte if dare mige agar itemi k user roosh click karde, too selectedItems peyda nashod
            if (!state.selectedItems.find(item => item.id === action.payload.id)) {
                state.selectedItems.push({
                    // on chizi k roosh click shode + ye quantity=1 ro beriz too arraye selectedItems
                    ...action.payload,
                    quantity: 1
                });
            }
            return {
                // ettelaati k ta alan too state has ro spread mikonim k pak nashe
                ...state,
                // tooye selectedItems miad objecti ro mizare k dar bala behesh quantity o... ro ezaf kardim
                selectedItems: [...state.selectedItems],
                ...sumItems(state.selectedItems),
                checkout: false
            }


        case "REMOVE_ITEM":
            // hameye item haro save mikone tooye newSelectedItem b joz oni k user roosh click karde
            const newSelectedItem = state.selectedItems.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                selectedItems: [...newSelectedItem],
                ...sumItems(newSelectedItem)
            }

        case "INCREASE":
            const indexI = state.selectedItems.findIndex(item => item.id === action.payload.id);
            state.selectedItems[indexI].quantity++;
            return {
                ...state,
                ...sumItems(state.selectedItems)
            }

        case "DECREASE":
            const indexD = state.selectedItems.findIndex(item => item.id === action.payload.id);
            state.selectedItems[indexD].quantity--;
            return {
                ...state,
                ...sumItems(state.selectedItems)
            }

        case "CHECKOUT":
            return {
                selectedItems: [],
                itemsCounter: 0,
                totalPrice: 0,
                checkout: true
            }

        case "CLEAR":
            return {
                selectedItems: [],
                itemsCounter: 0,
                totalPrice: 0,
                checkout: false
            }

        default:
            return {
                state
            }
    }
}


export const cartContext = createContext();


const CartContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        /*         
        state o dispatch b soorate key:value hastan amma chon esme key ba esme value yeki has,
        yekisho midim o ES6 khodesh mifahme o match mikone baham. halate asli intorie -->
        {{state: state, dispatch: dispatch}} */
        <cartContext.Provider value={{ state, dispatch }}>
            {props.children}
        </cartContext.Provider>
    );
};

export default CartContextProvider;