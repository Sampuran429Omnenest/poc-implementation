// Make sure this path points to where you saved the OrderBook component
import { OrderBook } from "../features/orders/components/OrderBook";
const OrdersPage = () => {
    return (
        <div>
            {/* The OrderBook component will automatically handle fetching, 
              mocking data, loading states, and rendering the table! 
            */}
            <OrderBook />
        </div>
    );
};

export default OrdersPage;
