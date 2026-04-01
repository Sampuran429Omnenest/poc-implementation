// Make sure this path points to where you saved the OrderBook component
import { OrderBook } from "../features/orders/components/OrderBook";
const OrdersPage = () => {
    return (
        <div className="h-screen w-full bg-[#F9F9F9] p-6">
            <OrderBook />
        </div>
    );
};

export default OrdersPage;
