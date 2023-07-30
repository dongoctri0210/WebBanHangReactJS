import { Link } from "react-router-dom";
import { FaPlus, FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import OrderService from "../../../services/OrderService";
function OrderList() {
  const [orders, setOrders] = useState([]);
  useEffect(function () {
    (async function () {
      await OrderService.getAll().then(function (result) {
        setOrders(result.data.orders);
      });
    })();
  }, []);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-success">DANH MỤC ĐƠN HÀNG</strong>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ width: 50 }} className="text-center">
                #
              </th>
              <th style={{ width: 50 }} className="text-center">
                ID
              </th>
              <th style={{ width: 250 }} className="text-center">
                Họ tên khách hàng
              </th>
              <th style={{ width: 250 }} className="text-center">
                Số điện thoại
              </th>
              <th style={{ width: 250 }} className="text-center">
                Địa chỉ
              </th>
              <th style={{ width: 500 }} className="text-center">
                Ghi chú
              </th>
              <th className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(function (order, index) {
              return (
                <tr key={index}>
                  <td style={{ width: 50 }}>
                    <input type="checkbox" className="text-center" />
                  </td>
                  <td style={{ width: 50 }} className="text-center">
                    {order.id}
                  </td>
                  <td style={{ width: 250 }}>{order.name}</td>
                  <td style={{ width: 250 }} className="text-center">
                    {order.phone}
                  </td>
                  <td style={{ width: 250 }}>{order.address}</td>
                  <td style={{ width: 500 }}>{order.note}</td>
                  <td style={{ width: 150 }}>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={"/admin/order/show/1"}
                    >
                      <FaRegEye />
                    </Link>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={"/admin/order/update/1"}
                    >
                      <FaEdit />
                    </Link>
                    <button className="btn btn-sm btn-danger">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
