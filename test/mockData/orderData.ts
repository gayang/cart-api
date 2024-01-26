import { PAYMENT_METHOD, PAYMENT_STATUS } from "../../constants/order";

export default {
  cart: [],
  payment: {
    method: PAYMENT_METHOD[0],
    status: PAYMENT_STATUS[0],
  },
  shipping: {
    address: "Demo",
    method: "Demo",
    cost: 100,
  },
  total: 500,
};
